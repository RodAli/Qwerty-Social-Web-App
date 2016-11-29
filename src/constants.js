/* --- File paths --- */
exports.login = __dirname + '/assets/scripts/login';
exports.newsfeed = __dirname + '/assets/scripts/newsfeed';

exports.user = __dirname + '/user';
exports.admin = __dirname + '/admin';
exports.event = __dirname + '/event';
exports.dbAdapter = __dirname + '/db-adapter';

//views
exports.loginPage = __dirname + '/views/login.html';
exports.newsFeedPage = __dirname + '/views/newsfeed.html';



/* --- Constants representing success / failure for asynchronous callbacks
       or for other purposes --- */

exports.SUCCESS = "SUCCESS";
exports.ERROR = "ERROR";