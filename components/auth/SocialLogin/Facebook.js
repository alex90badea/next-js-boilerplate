import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FACEBOOK_CLIENT_ID} from '../../../constants';
import Auth from '../../../services/auth';

/**
 * Facebook Login
 *
 * @param socialCallback
 * @returns {*}
 * @constructor
 */
const Facebook = ({socialCallback}) => {

    const _handleResponse = async response => {

        // check code exists in response
        if (!response.hasOwnProperty('accessToken')) {
            return false;
        }

        // call api to get user
        const userData = await Auth.socialLogin('facebook', {accessToken: response.accessToken});
        socialCallback(userData);
    };

    return (
        <FacebookLogin
            appId={FACEBOOK_CLIENT_ID}
            autoLoad={false}
            render={renderProps => (
                <button className="btn btn-primary btn-sm" onClick={renderProps.onClick}>Facebook</button>
            )}
            fields="name,email,picture"
            callback={_handleResponse}/>
    );

};

export default Facebook;
