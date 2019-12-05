import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import newsService from '../services/newsService';
import News from "../components/News";
import {Col, Row, FormGroup, Label, Input} from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const initialFilters = {
    page: 1,
    lang: 'tr'
};

class NewsPage extends React.Component {


    state = {
        news: this.props.news || [],
        perPage: 0,
        pageCount: 0,
        total: 0,
        filters: initialFilters,
        scroll: true
    };

    static async getInitialProps() {

        let newsData = await newsService.getNews(initialFilters);
        return {newsData};
    }

    componentDidMount() {

        this.setState({
            news: this.props.newsData.data,
            perPage: this.props.newsData.per_page,
            pageCount: this.props.newsData.last_page,
            total: this.props.newsData.total
        })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            await this._getNews()
        }
    }

    _handlePageScroll = async page => {

        this.setState({
            filters: {
                ...this.state.filters,
                page,
            },
            scroll: false
        }, () => this._getNews(true));
    };

    _handleFilters = (filterName, filterData) => _ => {

        this.setState({
            filters: {
                ...this.state.filters,
                [filterName]: filterData,
                page: initialFilters.page
            }
        }, () => this._getNews());
    };

    _getNews = async (append = false) => {

        let newsData = await newsService.getNews(this.state.filters);
        let news = append ? [...this.state.news, ...newsData.data] : newsData.data;

        this.setState({
            news: news,
            perPage: newsData.per_page,
            pageCount: newsData.last_page,
            total: newsData.total,
            scroll: newsData.current_page < newsData.last_page
        })
    };


    render() {
        const {news} = this.state;

        return (
            <BaseLayout>

                <h2>News Page</h2>

                <FormGroup>
                    <legend>Language</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" checked={this.state.filters.lang === 'en'}
                                   onChange={this._handleFilters('lang', 'en')}/> EN
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" checked={this.state.filters.lang === 'tr'}
                                   onChange={this._handleFilters('lang', 'tr')}/>TR
                        </Label>
                    </FormGroup>
                </FormGroup>

                <Row>
                    {news.map((item, index) => {

                        return <Col key={index} className="mb-3" sm={6}>
                            <News news={item}/>
                        </Col>;

                    })}
                </Row>


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
)(NewsPage);
