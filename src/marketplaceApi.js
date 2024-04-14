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
        return this.marketplaceClient.post(`/account/send_email_code`, qs.stringify({
            "email": email
        }))
    }

    static findUsers(query, page, pageSize) {
        return this.marketplaceClient.get(`/account/users`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }
}

export class PriveteMarketplaceApi {
    static authHeaders
    static authenitcatedClient

    static initCreditans(username, password) {
        this.authHeaders = new Headers()
        this.authHeaders.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        this.authenitcatedClient = axios.create({
            baseURL: MARKET_PLACE_ENDPOINT,
            headers: this.authHeaders
        })
    }

    static uploadFile(multipart) {
        return this.authenitcatedClient.post(`/file-storage/file`, {multipart}) // idk
    }

    static uploadFileByURL(filename, url) {
        return this.authenitcatedClient.post(`/file-storage/file_by_url`, qs.stringify({
            "name": filename,
            "url": url
        }))
    }

    static fileInto(fileId) {
        return this.authenitcatedClient.get(`/file-storage/${fileId}/info`)
    }

    static fileBytes(fileId) {
        return this.authenitcatedClient.get(`/file-storage/${fileId}/bytes`)
    }

    static getFile(fileId) {
        return this.authenitcatedClient.get(`/file-storage/${fileId}`)
    }

    static deleteFile(fileId) {
        return this.authenitcatedClient.delete(`/file-storage/${fileId}`)
    }

    static getMe() {
        return this.authenitcatedClient.delete(`/account/me`)
    }

    static addShippingAddress(shippingAddress) {
        return this.authenitcatedClient.post(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    static removeShippingAddress(shippingAddress) {
        return this.authenitcatedClient.delete(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }
    /** 
     * Categories
     */

    static registerCategory(registerRequest) {
        return this.authenitcatedClient.post(`/categories/register`, registerRequest)
    }

    static findCategory(query, page, pageSize) {
        return this.authenitcatedClient.get(`/categories/find`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }

    static listCategory(page, pageSize) {
        return this.authenitcatedClient.get(`/categories`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countCategories() {
        return this.authenitcatedClient.get(`/categories/count`)
    }

    /*
    * Products
    */
    static registerProduct(registerRequest) {
        return this.authenitcatedClient.post(`/products/register`, registerRequest)
    }

    static deleteProduct(productId) {
        return this.authenitcatedClient.delete(`/products/${productId}`)
    }

    static findProducts(query, page, pageSize) {
        return this.authenitcatedClient.get(`/products/find`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countProducts() {
        return this.authenitcatedClient.get(`/products/count`)
    }

    static editProduct(product) {
        return this.authenitcatedClient.post(`/products/edit`, product)
    }

    /*
    * Discounts
    */
    static registerDiscount(registerRequest) {
        return this.authenitcatedClient.post(`/discounts/register`, registerRequest)
    }

    static deleteDiscount(discountId) {
        return this.authenitcatedClient.delete(`/discounts/${discountId}`)
    }

    static listDiscounts(page, pageSize) {
        return this.authenitcatedClient.get(`/discounts`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }
    /*
    * Orders
    */

    static registerOrder(registerRequest) {
        return this.authenitcatedClient.post(`/orders/register`, registerRequest)
    }

    static cancelOrder(orderId) {
        return this.authenitcatedClient.post(`/orders/cancel`, qs.stringify({
            "orderId": orderId
        }))
    }

    static changeOrderStatus(orderId, newStatus) {
        return this.authenitcatedClient.post(`/orders/${orderId}/change_status`, qs.stringify({
            "newStatus": newStatus
        }))
    }

    static listMyOrders(page, pageSize) {
        return this.authenitcatedClient.get(`/orders/list_my`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countMyOrders() {
        return this.authenitcatedClient.get(`/orders/count_my`)
    }

    static calculateOrder(registerRequest) {
        return this.authenitcatedClient.get(`/orders/calculate`, registerRequest)
    }

    /*
    * Favlists
    */
    static createFavoriteList(registerRequest) {
        return this.authenitcatedClient.post(`/favlists/create`, registerRequest)
    }

    static deleteFavoriteList(listId) {
        return this.authenitcatedClient.delete(`/favlists/${listId}`)
    }

    static changeFavoriteListVisibility(listId, isPublic) {
        return this.authenitcatedClient.post(`/favlists/${listId}/change_visibility`, qs.stringify({
            "isPublic": isPublic
        }))
    }

    static addProductToFavoriteList(listId, productId) {
        return this.authenitcatedClient.post(`/favlists/${listId}/product/${productId}`)
    }

    static removeProductFromFavoriteList(listId, productId) {
        return this.authenitcatedClient.delete(`/favlists/${listId}/product/${productId}`)
    }

    static getMyFavoriteLists() {
        return this.authenitcatedClient.get(`/favlists/my`)
    }

    static getPublicFavoriteList(listId) {
        return this.authenitcatedClient.get(`/favlists/${listId}/get_public`)
    }

    static getUserPublicFavoriteLists(accountId) {
        return this.authenitcatedClient.get(`/favlists/from_account/${accountId}`)
    }

    /*
    * Comments
    */

    static registerComment(registerRequest) {
        return this.authenitcatedClient.post(`/comments/register`, registerRequest)
    }

    static deleteComment(commentId) {
        return this.authenitcatedClient.delete(`/comments/${commentId}`)
    }

    static listComments(productId, page, pageSize) {
        return this.authenitcatedClient.get(`/comments/from_product/${productId}`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }
}

 