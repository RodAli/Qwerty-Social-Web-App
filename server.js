var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var routes = require('./src/routes');
var path = require('path');
var app = express();

// Include views, css and scripts
app.use(express.static(__dirname + '/src/assets'));
app.use(express.static(__dirname + '/'));

// Set up to use a session
app.use(cookieParser('secretkey'));
app.use(session({
    secret: 'secrettkey123'
}));

// Use body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.get('/', routes.startUp);
app.get('/getCurrentUser', routes.getCurrentUser);
app.post('/login', routes.login);
app.post('/logout', routes.logout);
app.post('/register', routes.register);
app.get('/allPosts', routes.allPosts);
app.get('/getUserByName', routes.getUserByName); // Pass in query string??
app.get('/getPostsForUser', routes.getPostsForUser);
app.post('/makepost', routes.makePost);
app.post('/rate', routes.rateUser);


// Start the server
app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
