import Http from '../libs/http';

export default new class NewsService {

    getSingleNews = async (id) => {

        let res = await Http.get('news/' + id);
        return res.data;

    };

    getNews = async (filters = {}) => {

        let res = await Http.get('news', filters);
        return res.data;

    };

    getSliderNews = async () => {

        let res = await Http.get('news-slider');
        return res.data;

    };


}();