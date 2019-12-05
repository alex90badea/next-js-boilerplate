import React from 'react';
import GoogleLogin from "react-google-login";
import {GOOGLE_CLIENT_ID} from '../../../constants';
import Auth from '../../../services/auth';

/**
 * Google Login
 *
 * @param socialCallback
 * @returns {*}
 * @constructor
 */
const Google = ({socialCallback}) => {

    const _handleResponse = async response => {

        // check code exists in response
        if (!response.hasOwnProperty('code')) {
            return false;
        }

        // call api to get user
        const userData = await Auth.socialLogin('google', {accessToken: response.code});
        socialCallback(userData);
    };

    return (
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
                <button onClick={renderProps.onClick} className="btn btn-primary btn-sm"
                        disabled={renderProps.disabled}>Google</button>
            )}
            onSuccess={_handleResponse}
            onFailure={_handleResponse}
            responseType="code"
        />
    );

};

export default Google;
