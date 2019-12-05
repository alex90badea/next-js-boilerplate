import React from 'react';
import {Link} from "../routes";
import {connect} from "react-redux";
import BaseLayout from "./layouts/BaseLayout";
import {bindActionCreators} from "redux";
import {setModalLogin} from "../actions/main";

/**
 *  Unauthenticated page
 */
class Unauthenticated extends React.Component {

    openModalLogin = () => {
        this.props.setModalLogin(true);
    };

    render() {

        return (
            <BaseLayout>
                <h4>You are not authenticated. Click <button onClick={this.openModalLogin}>here</button> to login.</h4>
            </BaseLayout>
        )


    }
}

export default connect( store => ({
        modalLogin: store.base.modalLogin,
    }),
    dispatch => ({
        ...bindActionCreators({
            setModalLogin,
        }, dispatch)
    })
)(Unauthenticated);
