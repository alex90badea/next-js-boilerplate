import axios from 'axios';
import qs from 'qs';
import {translate} from '../libs/trans';
import {API_URL} from '../constants';
import Auth from "../services/auth";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class Http {

    constructor() {
        axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.interceptors.request.use((request) => {
            if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                request.data = qs.stringify(request.data);
            }
            return request;
        });
        this._axios = axios.create({});
        this._url = API_URL;
        this._jwtCookie = null;
        this._response = false;
        this._error = false;
        this._axiosConfig = {};

    }

    _setJwtCookie(jwt) {
        this._jwtCookie = jwt;
    }

    _getAuthConfig() {

        if (this._jwtCookie) {
            return Object.assign({}, {
                headers: {'Authorization': 'Bearer ' + this._jwtCookie}
            });
        }

        return {};
    }
    
    _checkJwtInvalidResponse(errorText) {
        if (errorText === 'jwt_token_is_required') {
            Auth.logout();
            window.location.reload();
        }
    }

    build() {
        
        let response = this._response && this._response.data ? {...this._response.data} : false;
        this._response = false;

        let isError = false;
        let errorMessage = {};
        let data = false;

        
        if (response) {
            if (response.responseType && response.responseType === 'success') {
                data = response.data;
            } else {
                isError = true;
                if (typeof response.errorMessage === 'object') {
      
                    for (let error in response.errorMessage) {
                        if (response.errorMessage.hasOwnProperty(error)) {
                            
                            let errorText;
                            if (Array.isArray(response.errorMessage[error])) {
                                errorText = response.errorMessage[error][0];
                            } else {
                                errorText = response.errorMessage[error];
                            }

                            errorMessage = {...errorMessage, [error]: translate(errorText)};

                            this._checkJwtInvalidResponse(errorText);
                        }
                    }
                } else {

                    errorMessage = {error: translate(response.errorMessage)};

                    this._checkJwtInvalidResponse(response.errorMessage);

                }
            }
        } else {
            isError = true;
            errorMessage = {error: translate('misc.api')};
        }

        return {
            isError,
            errorMessage,
            data,
        };
    }

    buildError() {
        
        let errorData = this._error ? {...this._error} : false;
        this._error = false;

        let isError = false;
        let errorMessage = {};
        let data = false;

        if (errorData) {
            isError = true;
            if (typeof errorData.errorMessage === 'object') {
                for (let error in errorData.errorMessage) {
                    if (errorData.errorMessage.hasOwnProperty(error)) {
                        if (Array.isArray(errorData.errorMessage[error])) {
                            errorMessage = {...errorMessage, [error]: translate(errorData.errorMessage[error][0])};
                        } else {
                            errorMessage = {...errorMessage, [error]: translate(errorData.errorMessage[error])};
                        }
                    }
                }
            } else {
                this._checkJwtInvalidResponse(errorData.errorMessage);
                errorMessage = {error: translate(errorData.errorMessage)};
            }
        }

        return {
            isError,
            errorMessage,
            data
        };
    }

    async get(endpoint, options = {}) {

        let url = `${this._url}/${endpoint}`;

        try {
            this._response = await this._axios.get(url, {
                params: {
                    ...options,
                },
                ...this._getAuthConfig()
            });
        } catch (e) {
            this._error = e.response;

            return this.buildError(e.response);
        }

        return this.build();
    }

    async post(endpoint, data = {}) {

        let url = `${this._url}/${endpoint}`;

        try {
            this._response = await this._axios.post(url, data, this._getAuthConfig());
        } catch (e) {
            this._error = e.response.data;

            return this.buildError();
        }

        return this.build();
    }

    async delete(endpoint, data = {}) {

        let url = `${this._url}/${endpoint}`;

        try {
            this._response = await this._axios.delete(url, {...this._getAuthConfig(), params: {...data}});
        } catch (e) {
            this._error = e.response.data;
            return this.buildError();
        }

        return this.build();
    }

    async put(endpoint, data = {}) {

        let url = `${this._url}/${endpoint}`;

        try {
            this._response = await this._axios.put(url, {
                ...data,
            }, this._getAuthConfig());
        } catch (e) {
            this._error = e.response.data;
            return this.buildError();
        }

        return this.build();
    }

    async patch(endpoint, data = {}) {

        let url = `${this._url}/${endpoint}`;

        try {
            this._response = await this._axios.patch(url, {
                ...data,
            }, this._getAuthConfig());
        } catch (e) {
            this._error = e.response.data;
            return this.buildError();
        }

        return this.build();
    }

}

export default new Http();
