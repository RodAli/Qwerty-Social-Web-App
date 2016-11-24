var express = require('express');
var bodyParser = require('body-parser');
var books = require('./routes/routes');
var app = express();

// Include views, css and scripts
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// Use body parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/books', books.findAll);

app.post('/addbook', books.addOne);

app.put('/like/:isbn', books.like);


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
