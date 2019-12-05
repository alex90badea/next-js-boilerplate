import React from 'react';
import Unauthenticated from '../Unauthenticated';

export default function (Component) {

    /**
     *  HOC - middleware for logged in users
     */
    return class withAuth extends React.Component {

        /**
         * Get props for child component
         *
         * @param args
         * @returns {Promise<*>}
         */
        static async getInitialProps(args) {
            return await Component.getInitialProps && await Component.getInitialProps(args);
        }

        /**
         * Checks user is logged in
         *
         * @returns {boolean}
         */
        isLogged() {
            return this.props.user !== false;
        }


        /**
         * Render the Component or show Unauthenticated
         *
         * @returns {*}
         */
        render() {

            if (this.isLogged())
                return <Component {...this.props} />;

            return <Unauthenticated/>;
        }
    }

}
