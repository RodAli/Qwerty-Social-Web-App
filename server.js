var express = require('express');
var bodyParser = require('body-parser');
var books = require('./routes/routes');
var app = express();

// Include views, css and scripts
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));
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



// Start the server
app.listen(3000);
console.log('Listening on port 3000');
