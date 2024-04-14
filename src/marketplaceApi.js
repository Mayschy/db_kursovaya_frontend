import axios from "axios"
import qs from "qs"

const MARKET_PLACE_ENDPOINT = "http://192.168.0.59:8080"


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

        return marketplaceClient.post(`/account/register`, payload)
    }

    static sendEmailCode(email) {
        return marketplaceClient.post(`/account/send_email_code`, qs.stringify({
            "email": email
        }))
    }

    static findUsers(query, page, pageSize) {
        return marketplaceClient.get(`/account/users`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }
}

export class PriveteMarketplaceApi {
    static authHeaders
    static client

    static initCreditans(username, password) {
        this.authHeaders = new Headers()
        this.authHeaders.set('Authorization', 'Basic ' + base64.encode(username + ":" + password))
        this.client = axios.create({
            baseURL: MARKET_PLACE_ENDPOINT,
            headers: this.authHeaders
        })
    }

    static getMe() {
        return authenitcatedClient.get(`/account/me`)
    }

    static addShippingAddress(shippingAddress) {
        return authenitcatedClient.post(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    static removeShippingAddress(shippingAddress) {
        return authenitcatedClient.delete(`${MARKET_PLACE_ENDPOINT}/account/shipping_address`, qs.stringify({
            "shippingAddress": shippingAddress
        }))
    }

    static registerCategory(registerRequest) {
        return authenitcatedClient.post(`/category/register`, registerRequest)
    }

    static findCategory(query, page, pageSize) {
        return authenitcatedClient.get(`/category/find`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }

    static listCategory(page, pageSize) {
        return this.client.get(`/category/list`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countCategories() {
        return this.client.get(`/category/count`)
    }

    static registerProduct(registerRequest) {
        return this.client.post(`/product/register`, registerRequest)
    }

    static deleteProduct(productId) {
        return this.client.post(`/product/delete`, qs.stringify({
            "productId": productId
        }))
    }

    static findProducts(query, page, pageSize) {
        return this.client.get(`/product/find`, qs.stringify({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countProducts() {
        return this.client.get(`/product/count`)
    }

    static editProduct(product) {
        return this.client.post(`/product/edit`, product)
    }

    static registerDiscount(registerRequest) {
        return this.client.post(`/discount/register`, registerRequest)
    }

    static deleteDiscount(discountId) {
        return this.client.post(`/discount/delete`, qs.stringify({
            "discountId": discountId
        }))
    }

    static listDiscounts(page, pageSize) {
        return this.client.get(`/discount/list`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }

    static registerOrder(registerRequest) {
        return this.client.post(`/order/register`, registerRequest)
    }

    static cancelOrder(orderId) {
        return this.client.post(`/order/cancel`, qs.stringify({
            "orderId": orderId
        }))
    }

    static changeOrderStatus(orderId, newStatus) {
        return this.client.post(`/order/change_status`, qs.stringify({
            "orderId": orderId,
            "newStatus": newStatus
        }))
    }

    static listMyOrders(page, pageSize) {
        return this.client.get(`/order/list_my`, qs.stringify({
            "page": page,
            "pageSize": pageSize
        }))
    }

    static countMyOrders() {
        return this.client.get(`/order/count_my`)
    }

    static calculateOrder(registerRequest) {
        return this.client.get(`/order/calculate`, registerRequest)
    }

    static createFavoriteList(registerRequest) {
        return this.client.post(`/favlist/create`, registerRequest)
    }

    static deleteFavoriteList(listId) {
        return this.client.post(`/favlist/delete`, qs.stringify({
            "listId": listId
        }))
    }

    static changeFavoriteListVisibility(listId, isPublic) {
        return this.client.post(`/favlist/change_visibility`, qs.stringify({
            "listId": listId,
            "isPublic": isPublic
        }))
    }

    static addProductToFavoriteList(listId, productId) {
        return this.client.post(`/favlist/add_product`, qs.stringify({
            "listId": listId,
            "productId": productId
        }))
    }

    static removeProductFromFavoriteList(listId, productId) {
        return this.client.post(`/favlist/remove_product`, qs.stringify({
            "listId": listId,
            "productId": productId
        }))
    }

    static getMyFavoriteLists() {
        return this.client.get(`/favlist/get_my`)
    }

    static getPublicFavoriteList(listId) {
        return this.client.get(`/favlist/get_public`, qs.stringify({
            "listId": listId
        }))
    }

    static getUserPublicFavoriteLists(accountId) {
        return this.client.get(`/favlist/find_account_public_lists`, qs.stringify({
            "accountId": accountId
        }))
    }
}