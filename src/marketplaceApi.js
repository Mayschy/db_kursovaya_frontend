import axios from "axios"
import qs from "qs"

const MARKET_PLACE_ENDPOINT = "http://192.168.0.59:8080/v2"


export class PublicMarketplaceApi {
    static marketplaceClient = axios.create({
        baseURL: MARKET_PLACE_ENDPOINT,
    })

    static register(username, firstname, lastname, password, role, mailCode, adminSecret) {
        const payload = {
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "password": password,
            "role": role,
            "mailCode": mailCode,
            "adminSecret": adminSecret
        }

        return this.marketplaceClient.post(`/account/register`, payload)
    }

    static sendEmailCode(email) {
        return this.marketplaceClient.post(`/account/send_email_code`, {
            params: {"email": email}
        })
    }

    static findUsers(query, page, pageSize) {
        return this.marketplaceClient.get(`/account/users`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

export class PrivateMarketplaceApi {
    constructor(username, password) {
        this.authHeaders = new Headers()
        this.authHeaders.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        this.authenticatedClient = axios.create({
            baseURL: MARKET_PLACE_ENDPOINT,
            headers: this.authHeaders
        })
    }

    uploadFile(multipart) {
        return this.authenticatedClient.post(`/file-storage/file`, {multipart}) // idk
    }

    uploadFileByURL(filename, url) {
        return this.authenticatedClient.post(`/file-storage/file_by_url`, qs.stringify({
            "name": filename,
            "url": url
        }))
    }

    fileInto(fileId) {
        return this.authenticatedClient.get(`/file-storage/${fileId}/info`)
    }

    fileBytes(fileId) {
        return this.authenticatedClient.get(`/file-storage/${fileId}/bytes`)
    }

    getFile(fileId) {
        return this.authenticatedClient.get(`/file-storage/${fileId}`)
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

    findCategory(query, page, pageSize) {
        return this.authenticatedClient.get(`/categories/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    listCategory(page, pageSize) {
        return this.authenticatedClient.get(`/categories`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    countCategories() {
        return this.authenticatedClient.get(`/categories/count`)
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

    findProducts(query, page, pageSize) {
        return this.authenticatedClient.get(`/products/find`, {
            params: {
                "query": query,
                "page": page,
                "pageSize": pageSize
            }
        })
    }

    countProducts() {
        return this.authenticatedClient.get(`/products/count`)
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

    listDiscounts(page, pageSize) {
        return this.authenticatedClient.get(`/discounts`, {
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

    calculateOrder(registerRequest) {
        return this.authenticatedClient.get(`/orders/calculate`, registerRequest)
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

    getPublicFavoriteList(listId) {
        return this.authenticatedClient.get(`/favlists/${listId}/get_public`)
    }

    getUserPublicFavoriteLists(accountId) {
        return this.authenticatedClient.get(`/favlists/from_account/${accountId}`)
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

    listComments(productId, page, pageSize) {
        return this.authenticatedClient.get(`/comments/from_product/${productId}`, {
            params: {
                "page": page,
                "pageSize": pageSize
            }
        })
    }
}

 