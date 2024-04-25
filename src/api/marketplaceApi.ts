import axios, { AxiosHeaders, AxiosInstance } from "axios"
import qs from "qs"

const MARKET_PLACE_ENDPOINT = "http://192.168.0.59:8080/v2"

const marketplaceClient = axios.create({
    baseURL: MARKET_PLACE_ENDPOINT,
})

export class PublicMarketplaceApi {
    static register(request) {
        return marketplaceClient.post(`/account/register`, request)
    }

    static sendEmailCode(email) {
        return marketplaceClient.post(`/account/send_email_code`, qs.stringify({
            "email": email
        }))
    }

    static findUsers(query, page, pageSize) {
        return marketplaceClient.get(`/account/users`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

export class PrivateMarketplaceApi {
    static instance?: PrivateMarketplaceApi = undefined;
    authHeaders: AxiosHeaders
    authenticatedClient: AxiosInstance

    constructor(username, password) {
        this.authHeaders = new AxiosHeaders()
        this.authHeaders.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        this.authenticatedClient = axios.create({
            baseURL: MARKET_PLACE_ENDPOINT,
            headers: this.authHeaders
        })
    }

    uploadFile(multipart) {
        return this.authenticatedClient.post(`/file-storage/file`, { multipart }) // idk
    }

    uploadFileByURL(filename, url) {
        return this.authenticatedClient.post(`/file-storage/file_by_url`, qs.stringify({
            "name": filename,
            "url": url
        }))
    }

    static fileInfo(fileId) {
        return marketplaceClient.get(`/file-storage/${fileId}/info`)
    }

    static fileBytes(fileId) {
        return marketplaceClient.get(`/file-storage/${fileId}/bytes`)
    }

    static getFile(fileId) {
        return marketplaceClient.get(`/file-storage/${fileId}`)
    }

    deleteFile(fileId) {
        return this.authenticatedClient.delete(`/file-storage/${fileId}`)
    }

    getMe() {
        return this.authenticatedClient.delete(`/account/me`)
    }

    addShippingAddress(shippingAddress) {
        return this.authenticatedClient.post(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    removeShippingAddress(shippingAddress) {
        return this.authenticatedClient.delete(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, {
            params: {
                "shippingAddress": shippingAddress
            }
        })
    }

    /**
     * Categories
     */

    registerCategory(registerRequest) {
        return this.authenticatedClient.post(`/categories/register`, registerRequest)
    }

    static findCategory(query, page, pageSize) {
        return marketplaceClient.get(`/categories/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    static listCategory(page, pageSize) {
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
    registerProduct(registerRequest) {
        return this.authenticatedClient.post(`/products/register`, registerRequest)
    }

    deleteProduct(productId) {
        return this.authenticatedClient.delete(`/products/${productId}`)
    }

    static findProducts(query, page, pageSize) {
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

    addProductImage(productId, imageLink) {
        return this.authenticatedClient.post(`/products/${productId}/image`, qs.stringify({
            "image": imageLink
        }))
    }

    deleteProductImage(productId, imageLink) {
        return this.authenticatedClient.delete(`/products/${productId}/image`, {
            params: {
                "image": imageLink
            }
        })
    }

    /*
    * Discounts
    */
    registerDiscount(registerRequest) {
        return this.authenticatedClient.post(`/discounts/register`, registerRequest)
    }

    deleteDiscount(discountId) {
        return this.authenticatedClient.delete(`/discounts/${discountId}`)
    }

    static listDiscounts(page, pageSize) {
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

    registerOrder(registerRequest) {
        return this.authenticatedClient.post(`/orders/register`, registerRequest)
    }

    cancelOrder(orderId) {
        return this.authenticatedClient.post(`/orders/cancel`, qs.stringify({
            "orderId": orderId
        }))
    }

    changeOrderStatus(orderId, newStatus) {
        return this.authenticatedClient.post(`/orders/${orderId}/change_status`, qs.stringify({
            "newStatus": newStatus
        }))
    }

    listMyOrders(page, pageSize) {
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

    static calculateOrder(registerRequest) {
        return marketplaceClient.get(`/orders/calculate`, registerRequest)
    }

    /*
    * Favlists
    */
    createFavoriteList(registerRequest) {
        return this.authenticatedClient.post(`/favlists/create`, registerRequest)
    }

    deleteFavoriteList(listId) {
        return this.authenticatedClient.delete(`/favlists/${listId}`)
    }

    changeFavoriteListVisibility(listId, isPublic) {
        return this.authenticatedClient.post(`/favlists/${listId}/change_visibility`, qs.stringify({
            "isPublic": isPublic
        }))
    }

    addProductToFavoriteList(listId, productId) {
        return this.authenticatedClient.post(`/favlists/${listId}/product/${productId}`)
    }

    removeProductFromFavoriteList(listId, productId) {
        return this.authenticatedClient.delete(`/favlists/${listId}/product/${productId}`)
    }

    getMyFavoriteLists() {
        return this.authenticatedClient.get(`/favlists/my`)
    }

    static getPublicFavoriteList(listId) {
        return marketplaceClient.get(`/favlists/${listId}/get_public`)
    }

    static getUserPublicFavoriteLists(accountId) {
        return marketplaceClient.get(`/favlists/from_account/${accountId}`)
    }

    /*
    * Comments
    */

    registerComment(registerRequest) {
        return this.authenticatedClient.post(`/comments/register`, registerRequest)
    }

    deleteComment(commentId) {
        return this.authenticatedClient.delete(`/comments/${commentId}`)
    }

    static listComments(productId, page, pageSize) {
        return marketplaceClient.get(`/comments/from_product/${productId}`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

