import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import {withRouter} from 'next/router';
import newsService from "../services/newsService";
import News from "../components/News";

class SingleNews extends React.Component {

    static async getInitialProps({query}) {

        let news = await newsService.getSingleNews(query.id);
        return {news};

    }

    render() {

        const {news} = this.props;

        return (
            <BaseLayout>
                <h1>singleNews</h1>
                <News news={news}/>
            </BaseLayout>
        )
    }

}

export default withRouter(SingleNews);
