import axios, { AxiosHeaders, type AxiosInstance } from "axios"
import qs from "qs"
import { is_successful } from "./utils"
import { get } from "svelte/store"
import { persisted } from 'svelte-persisted-store'

const MARKET_PLACE_ENDPOINT = "http://192.168.0.59:8080/v2"

const marketplaceClient = axios.create({
    baseURL: MARKET_PLACE_ENDPOINT,
})

export const credentials = persisted('credentials', {
    'username': '',
    'password': '',
    'data': ''
})

export const DEFAULT_PAGE_SIZE = 15

export interface ICategoryDto {
    name: string,
    parentCategory?: string,
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
    characteristics: Map<string, string>,
    description: string,
    price: number,
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
    parentCategory: string,
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

    uploadFile(multipart: any) {
        return this.authenticatedClient.post(`/file-storage/file`, { multipart }) // idk
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
        return this.authenticatedClient.post(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    removeShippingAddress(shippingAddress: string) {
        return this.authenticatedClient.delete(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, {
            params: {
                "shippingAddress": shippingAddress
            }
        })
    }

    /**
     * Categories
     */

    registerCategory(registerRequest: any) {
        return this.authenticatedClient.post(`/categories/register`, registerRequest)
    }

    static findCategory(query: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/categories/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static listCategory(page: number, pageSize: number) {
        return marketplaceClient.get(`/categories`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static countCategories() {
        return marketplaceClient.get(`/categories/count`)
    }

    /*
    * Products
    */
    registerProduct(registerRequest: any) {
        return this.authenticatedClient.post(`/products/register`, registerRequest)
    }

    deleteProduct(productId: string) {
        return this.authenticatedClient.delete(`/products/${productId}`)
    }

    static getProduct(productId: string) {
        return marketplaceClient.get(`/products/${productId}`)
    }

    static findProducts(query: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/products/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static countProducts() {
        return marketplaceClient.get(`/products/count`)
    }

    addProductImage(productId: string, imageLink: string) {
        return this.authenticatedClient.post(`/products/${productId}/image`, qs.stringify({
            "image": imageLink
        }))
    }

    deleteProductImage(productId: string, imageLink: string) {
        return this.authenticatedClient.delete(`/products/${productId}/image`, {
            params: {
                "image": imageLink
            }
        })
    }

    /*
    * Discounts
    */
    registerDiscount(registerRequest: any) {
        return this.authenticatedClient.post(`/discounts/register`, registerRequest)
    }

    deleteDiscount(discountId: string) {
        return this.authenticatedClient.delete(`/discounts/${discountId}`)
    }

    static listDiscounts(page: number, pageSize: number) {
        return marketplaceClient.get(`/discounts`, {
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
        return this.authenticatedClient.post(`/orders/register`, registerRequest)
    }

    cancelOrder(orderId: string) {
        return this.authenticatedClient.post(`/orders/cancel`, qs.stringify({
            "orderId": orderId
        }))
    }

    changeOrderStatus(orderId: string, newStatus: string) {
        return this.authenticatedClient.post(`/orders/${orderId}/change_status`, qs.stringify({
            "newStatus": newStatus
        }))
    }

    listMyOrders(page: number, pageSize: number) {
        return this.authenticatedClient.get(`/orders/list_my`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    countMyOrders() {
        return this.authenticatedClient.get(`/orders/count_my`)
    }

    static calculateOrder(registerRequest: any) {
        return marketplaceClient.get(`/orders/calculate`, registerRequest)
    }

    /*
    * Favlists
    */
    createFavoriteList(registerRequest: any) {
        return this.authenticatedClient.post(`/favlists/create`, registerRequest)
    }

    deleteFavoriteList(listId: string) {
        return this.authenticatedClient.delete(`/favlists/${listId}`)
    }

    changeFavoriteListVisibility(listId: string, isPublic: boolean) {
        return this.authenticatedClient.post(`/favlists/${listId}/change_visibility`, qs.stringify({
            "isPublic": isPublic
        }))
    }

    addProductToFavoriteList(listId: string, productId: string) {
        return this.authenticatedClient.post(`/favlists/${listId}/product/${productId}`)
    }

    removeProductFromFavoriteList(listId: string, productId: string) {
        return this.authenticatedClient.delete(`/favlists/${listId}/product/${productId}`)
    }

    getMyFavoriteLists() {
        return this.authenticatedClient.get(`/favlists/my`)
    }

    static getPublicFavoriteList(listId: string) {
        return marketplaceClient.get(`/favlists/${listId}/get_public`)
    }

    static getUserPublicFavoriteLists(accountId: string) {
        return marketplaceClient.get(`/favlists/from_account/${accountId}`)
    }

    /*
    * Comments
    */

    registerComment(registerRequest: any) {
        return this.authenticatedClient.post(`/comments/register`, registerRequest)
    }

    deleteComment(commentId: string) {
        return this.authenticatedClient.delete(`/comments/${commentId}`)
    }

    static listComments(productId: string, page: number, pageSize: number) {
        return marketplaceClient.get(`/comments/from_product/${productId}`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

