//var User = require('../models/user');
"use strict";
/*
 * Return true if there exists a user in the database with the given
 * username, false otherwise.
 */
function usernameExists(username){
	// TODO: Somehow check in database if user with this username exists
}

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


exports.login = function(req, res){
	if (!req.body.hasOwnProperty('username') ||
	   	!req.body.hasOwnProperty('pass')){
		console.log("no data");
	} else {
		// TODO IMPLEMENT HERE ////////////////////
		console.log(req.body.username);
		console.log(req.body.pass);
	}
};


exports.logout = function(req, res){};


exports.registerView = function(req, res){};


exports.register = function(req, res){
	// Check if all fields are met and if the user already exists
	if (!req.body.hasOwnProperty('username') ||
		!req.body.hasOwnProperty('pass') ||
		!req.body.hasOwnProperty('fname') ||
		!req.body.hasOwnProperty('lname') ||
		usernameExists(req.body.username)){
		// Make sure all these elements are here for registering user
		res.statusCode = 400;
		return res.json({error: "User already exists or fields not met."});
	} else {
		
		var username = req.body.username;
		var pass = req.body.pass;
		var fname = req.body.fname;
		var lname = req.body.lname;

		let user = {
			"username":username,
			"pass":pass,
			"fname":fname,
			"lname":lname,
			"aboutme":"",
			"posts": [],
        	"avgRating": 0,
        	"numOfRatings": 0
		};

		//Adding the newuser to the User database
		User.push(user);

		return user;
	}
};


exports.allPosts = function(req, res){};


exports.getUserByName = function(req, res){};


exports.getPostsForUser = function(req, res){};


exports.makePost = function(req, res){};


exports.rateUser = function(req, res){}; 