const routes = require('next-routes');

module.exports = routes()
    .add('news', '/news')
    .add('singleNews', '/news/:id');
