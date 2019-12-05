import React from 'react';
import App from 'next/app';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import {store} from '../store';
import Auth from "../services/auth";
import {setUser} from '../actions/user';
import Http from '../libs/http';
import cookies from 'next-cookies';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

/**
 *  Default App
 */
class MyApp extends App {

    static async getInitialProps({Component, ctx}) {

        let pageProps = {};

        // check jwt cookie
        const {jwt} = cookies(ctx);

        if (jwt) {
            Http._setJwtCookie(jwt);
        }

        // check user is authenticated
        let isAuthenticated = Auth.isAuthenticated(jwt);

        if (isAuthenticated) {
            if (!process.browser) {
                ctx.store.dispatch(setUser(await Auth.getUserFromApi()));
            }
        } else {
            ctx.store.dispatch(setUser(false));
            Auth.logout();
        }


        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }


    render() {
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>

        );
    }
}

export default withRedux(store)(MyApp);
