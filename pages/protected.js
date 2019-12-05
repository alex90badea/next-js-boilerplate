import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import withAuth from '../components/hoc/withAuth';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

/**
 * Protected Page
 */
 class Protected extends React.Component {

    render() {

        return (
            <BaseLayout>

                <h2>Protected Page Example</h2>
                <h5>This page is accessible for logged in users.</h5>

            </BaseLayout>
        )
    }

}

export default connect(store => ({
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators({}, dispatch)
    })
)(withAuth(Protected));
