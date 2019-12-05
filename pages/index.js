import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

/**
 * Index Page
 */
class Index extends React.Component {


    render() {
        const {user} = this.props;

        return (
            <BaseLayout>
                <h3>Home page</h3>
                { user && <div>
                    Hi, {user.username}! You are logged in.
                </div>}
                { !user && <div>
                    Hi, Guest!
                </div>}
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
)(Index);
