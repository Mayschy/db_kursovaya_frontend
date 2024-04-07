
const MARKET_PLACE_ENDPOINT = "http://192.168.0.59:8080"

export class PublicMarketplaceApi {
    static register(username, firstname, lastname, password, role, mailCode, adminSecret) {

        const payload = JSON.stringify({
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "password": password,
            "role": role,
            "mailCode": mailCode,
            "adminSecret": adminSecret
        })

        console.log(payload)
        return fetch(`${MARKET_PLACE_ENDPOINT}/account/register`, {
            method: "POST",
            mode: 'no-cors',
            body: "hello world  fucking server fuck you",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export class PriveteMarketplaceApi {
    static authHeaders

    static initCreditans(username, password) {
        this.authHeaders = new Headers()
        this.authHeaders.set('Authorization', 'Basic ' + base64.encode(username + ":" + password))
    }

    static getMe() {
        return fetch(`${MARKET_PLACE_ENDPOINT}/account/get_me`, {
            headers: authHeaders
        })
    }

    static addShippingAddress(shippingAddress) {
        const params = new URLSearchParams({
            "shippingAddress": shippingAddress
        }).toString()
        return fetch(`${MARKET_PLACE_ENDPOINT}/account/add_shipping_address?${params}`, {
            headers: this.authHeaders
        })
    }

    static removeShippingAddress(shippingAddress) {
        const params = new URLSearchParams({
            "shippingAddress": shippingAddress
        }).toString()
        return fetch(`${MARKET_PLACE_ENDPOINT}/account/remove_shipping_address?${params}`, {
            headers: this.authHeaders
        })
    }

    static sendEmailCode(email) {
        const params = new URLSearchParams({
            "email": email
        }).toString()
        return fetch(`${MARKET_PLACE_ENDPOINT}/account/send_email_code?${params}`, {
            headers: this.authHeaders
        })
    }

    static registerCategory(registerRequest) {
        return fetch(`${MARKET_PLACE_ENDPOINT}/category/register`, {
            headers: this.authHeaders,
            method: "POST",
            body: JSON.stringify(registerRequest)
        })
    }

    static findCategory(query, page, pageSize) {
        const params = new URLSearchParams({
            "query": query,
            "page": page,
            "pageSize": pageSize
        }).toString()
        return fetch(`${MARKET_PLACE_ENDPOINT}/category/find?${params}`, {
            headers: this.authHeaders,
        })
    }
}