import React from 'react';
import {Link} from "../routes";

export default class News extends React.Component {


    render() {

        const {news} = this.props;

        return (
            <div>
                <Link route="singleNews" params={{id: news.id}}>
                    <img className="w-100" src={news.image_path} alt=""/>
                </Link>
                <p>{news.id} {news.title}</p>
            </div>
        )


    }
}