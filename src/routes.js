//var User = require('../models/user');


exports.startUp = function(req, res){
	if (req.session.hasOwnProperty("username")){
		// Login user
	} else {
		res.sendFile(__dirname + '/views/login.html');
	}
};


exports.getCurrentUser = function(req, res){
	if (!req.session.username){
		return res.json({name: ""});
	} else {
		return res.json({name: req.session.username});
	}
};


exports.login = function(req, res){};


exports.logout = function(req, res){};


exports.registerView = function(req, res){};


exports.register = function(req, res){};


exports.allPosts = function(req, res){};


exports.getUserByName = function(req, res){};


exports.getPostsForUser = function(req, res){};


exports.makePost = function(req, res){};


exports.rateUser = function(req, res){}; 