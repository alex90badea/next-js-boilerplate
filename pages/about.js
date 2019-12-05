import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import {connect} from "react-redux";

/**
 * About Page
 */
class About extends React.Component {

    render() {

        return (
            <BaseLayout>
                <h1>About</h1>
                <p>This is about page example.</p>
            </BaseLayout>
        )
    }

}

export default connect(state => state)(About);
