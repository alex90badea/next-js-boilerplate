import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import Http from '../libs/http';
import {JWT_COOKIE_NAME} from '../constants';

export default new class Auth {

    constructor() {
        this.cookieName = JWT_COOKIE_NAME;
    }

    login(jwt) {
        Cookie.set(this.cookieName, jwt);
    }

    logout() {
        Cookie.remove(this.cookieName);
    }

    isAuthenticated(token) {
        if (!token) return false;
        const decodedToken = jwt.decode(token);
        return new Date().getTime() < decodedToken.exp * 1000;

    }

    async getUserFromApi() {
        const response = await Http.get('user/get');
        if (response.isError) {
            return false;
        }
        return response.data;
    }

    async socialLogin(provider, data) {
        const response = await Http.post(`login/${provider}`, data);
        if (response.isError) {
            return false;
        }
        return response.data;
    }

}();