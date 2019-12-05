import Http from '../libs/http';

export default new class HomeService {

    getMyPosts = async (userId) => {

        let res = await Http.get('all-posts/' + userId);
        return res.data;

    };
    getHomeFeed = async () => {

        let res = await Http.get('home-feed');
        return res.data;

    };


}();