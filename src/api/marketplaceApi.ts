import axios, { AxiosHeaders, type AxiosInstance } from "axios"
import qs from "qs"
import { is_successful } from "./utils"
import { get } from "svelte/store"
import { persisted } from 'svelte-persisted-store'

import fs from 'fs'

export const MARKET_PLACE_ENDPOINT = "http://localhost:8080/v2"

const marketplaceClient = axios.create({
    baseURL: MARKET_PLACE_ENDPOINT,
})

export const credentials = persisted('credentials', {
    'username': '',
    'password': '',
    'data': ''
})

export const DEFAULT_PAGE_SIZE = 15

export interface IStoredFileDto {
    id: string,
    name: string,
    owner: string
}

export interface ICategoryDto {
    name: string,
    subcategories: string[],
    requiredProps: string[]
}

export interface ICommentDto {
    id: string,
    ownerId: string,
    productId: string,
    content: string,
    rate: number,
    timestamp: Date
}

export interface IAccountRegisterDto {
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    mailCode: string,
    role?: string,
    adminSecret?: string
}

export interface IProductDto {
    id: string,
    caption: string,
    categories: string[],
    characteristics: object,
    description: string,
    price: number,
    actualPrice: number,
    rate: number,
    ordersCount: number,
    images: string[]
}

export interface IProductRegisterDto {
    caption: string,
    categories: string[],
    characteristics: Map<string, string>,
    description: string,
    price: number,
    images: string[]
}

export interface ICategoryRegisterDto {
    name: string,
    parentCategory?: string,
    subcategories: string[],
    requiredProps: string[]
}

export class PublicMarketplaceApi {
    static register(request: IAccountRegisterDto) {
        return marketplaceClient.post(`/account/register`, request)
    }

    static sendEmailCode(email: string) {
        return marketplaceClient.post(`/account/send_email_code`, qs.stringify({
            "email": email
        }))
    }

    static findUsers(query: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/account/users`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

export function isAuthenticated() {
    return get(credentials).username != '' && get(credentials).password != ''
}

export async function authenticate(username: string, password: string) {
    const privateApi = new PrivateMarketplaceApi(username, password)
    const getMeResult = await privateApi.getMe()
    if (!is_successful(getMeResult.status))
        return undefined

    credentials.set({
        'username': username,
        'password': password,
        'data': JSON.stringify(getMeResult.data)
    })

    return privateApi
}

export function logout() {
    credentials.set({
        username: "",
        password: "",
        data: ""
    })
}

export class PrivateMarketplaceApi {
    authHeaders: AxiosHeaders
    authenticatedClient: AxiosInstance

    static fromLocalStorage() {
        const username = get(credentials).username
        const password = get(credentials).password

        return new PrivateMarketplaceApi(username, password)
    }

    constructor(username: string, password: string) {
        this.authHeaders = new AxiosHeaders()
        this.authHeaders.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        this.authHeaders.set('Access-Control-Allow-Origin', '*')
        this.authenticatedClient = axios.create({
            baseURL: MARKET_PLACE_ENDPOINT,
            headers: this.authHeaders
        })
    }

    uploadFile(form: FormData) {
        return this.authenticatedClient.post(`/file-storage/file`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    uploadFileByURL(filename: string, url: string) {
        return this.authenticatedClient.post(`/file-storage/file_by_url`, qs.stringify({
            "name": filename,
            "url": url
        }))
    }

    static fileInfo(fileId: string) {
        return marketplaceClient.get(`/file-storage/${fileId}/info`)
    }

    static fileBytes(fileId: string) {
        return marketplaceClient.get(`/file-storage/${fileId}/bytes`)
    }

    static getFile(fileId: string) {
        return marketplaceClient.get(`/file-storage/${fileId}`)
    }

    deleteFile(fileId: string) {
        return this.authenticatedClient.delete(`/file-storage/${fileId}`)
    }

    getMe() {
        return this.authenticatedClient.get(`/account/me`)
    }

    addShippingAddress(shippingAddress: string) {
        return this.authenticatedClient.post(`/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    removeShippingAddress(shippingAddress: string) {
        return this.authenticatedClient.delete(`/account/shipping_address`, {
            params: {
                "shippingAddress": shippingAddress
            }
        })
    }

    /**
     * Categories
     */

    registerCategory(registerRequest: any) {
        return this.authenticatedClient.post(`/marketplace/categories/register`, registerRequest)
    }

    static findCategory(query: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/marketplace/categories/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static listCategory(page: number, pageSize: number) {
        return marketplaceClient.get(`/marketplace/categories`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static countCategories() {
        return marketplaceClient.get(`/marketplace/categories/count`)
    }

    /*
    * Products
    */
    registerProduct(registerRequest: IProductRegisterDto) {
        const request = {
            caption: registerRequest.caption,
            categories: registerRequest.categories,
            characteristics: Object.fromEntries(registerRequest.characteristics),
            description: registerRequest.description,
            price: registerRequest.price,
            images: registerRequest.images
        }
        return this.authenticatedClient.post(`/marketplace/products/register`, request)
    }

    deleteProduct(productId: string) {
        return this.authenticatedClient.delete(`/marketplace/products/${productId}`)
    }

    static getProduct(productId: string) {
        return marketplaceClient.get(`/marketplace/products/${productId}`)
    }

    static findProducts(query: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/marketplace/products/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static countProducts() {
        return marketplaceClient.get(`/marketplace/products/count`)
    }

    addProductImage(productId: string, imageLink: string) {
        return this.authenticatedClient.post(`/marketplace/products/${productId}/image`, qs.stringify({
            "image": imageLink
        }))
    }

    deleteProductImage(productId: string, imageLink: string) {
        return this.authenticatedClient.delete(`/marketplace/products/${productId}/image`, {
            params: {
                "image": imageLink
            }
        })
    }

    /*
    * Discounts
    */
    registerDiscount(registerRequest: any) {
        return this.authenticatedClient.post(`/marketplace/discounts/register`, registerRequest)
    }

    deleteDiscount(discountId: string) {
        return this.authenticatedClient.delete(`/marketplace/discounts/${discountId}`)
    }

    static listDiscounts(page: number, pageSize: number) {
        return marketplaceClient.get(`/marketplace/discounts`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    /*
    * Orders
    */

    registerOrder(registerRequest: any) {
        return this.authenticatedClient.post(`/marketplace/orders/register`, registerRequest)
    }

    cancelOrder(orderId: string) {
        return this.authenticatedClient.post(`/marketplace/orders/cancel`, qs.stringify({
            "orderId": orderId
        }))
    }

    changeOrderStatus(orderId: string, newStatus: string) {
        return this.authenticatedClient.post(`/marketplace/orders/${orderId}/change_status`, qs.stringify({
            "newStatus": newStatus
        }))
    }

    listMyOrders(page: number, pageSize: number) {
        return this.authenticatedClient.get(`/marketplace/orders/list_my`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    countMyOrders() {
        return this.authenticatedClient.get(`/marketplace/orders/count_my`)
    }

    static calculateOrder(registerRequest: any) {
        return marketplaceClient.get(`/marketplace/orders/calculate`, registerRequest)
    }

    /*
    * Favlists
    */
    createFavoriteList(registerRequest: any) {
        return this.authenticatedClient.post(`/marketplace/favlists/create`, registerRequest)
    }

    deleteFavoriteList(listId: string) {
        return this.authenticatedClient.delete(`/marketplace/favlists/${listId}`)
    }

    changeFavoriteListVisibility(listId: string, isPublic: boolean) {
        return this.authenticatedClient.post(`/marketplace/favlists/${listId}/change_visibility`, qs.stringify({
            "isPublic": isPublic
        }))
    }

    addProductToFavoriteList(listId: string, productId: string) {
        return this.authenticatedClient.post(`/marketplace/favlists/${listId}/product/${productId}`)
    }

    removeProductFromFavoriteList(listId: string, productId: string) {
        return this.authenticatedClient.delete(`/marketplace/favlists/${listId}/product/${productId}`)
    }

    getMyFavoriteLists() {
        return this.authenticatedClient.get(`/marketplace/favlists/my`)
    }

    static getPublicFavoriteList(listId: string) {
        return marketplaceClient.get(`/marketplace/favlists/${listId}/get_public`)
    }

    static getUserPublicFavoriteLists(accountId: string) {
        return marketplaceClient.get(`/marketplace/favlists/from_account/${accountId}`)
    }

    /*
    * Comments
    */

    registerComment(registerRequest: any) {
        return this.authenticatedClient.post(`/marketplace/comments/register`, registerRequest)
    }

    deleteComment(commentId: string) {
        return this.authenticatedClient.delete(`/marketplace/comments/${commentId}`)
    }

    static listComments(productId: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/marketplace/comments/from_product/${productId}`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

