//var User = require('../models/user');
"use strict";
/*
 * Return true if there exists a user in the database with the given
 * username, false otherwise.
 */

var fs = require('fs');

var userObj;

fs.readFile('start_users.json', 'utf-8', function(err, data) {
    if(err) throw err;
    userObj = JSON.parse(data);
    //console.log(userObj.users);
});

function usernameExists(username){

		var exists = false;

		var user_list = userObj.users;	

		for(var i in user_list){
			if(user_list[i].username==username){
				exists = true;
			}
		}

		return exists;
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
	console.log(req.body);

	var usernameChecker = usernameExists(req.body.username);

	//Somehow alert the user if a username is taken.

	if(req.body.match && !usernameChecker){

	var new_user = {"username": req.body.username, "pass":req.body.p_word1, "fname":req.body.firstname, "lname":req.body.lastname,
					"aboutme":req.body.about_me, "posts":[], "avgRating":0, "numOfRatings":0};

	userObj.users.push(new_user);				

	}

	console.log(userObj);
};


exports.allPosts = function(req, res){};


exports.getUserByName = function(req, res){};


exports.getPostsForUser = function(req, res){};


exports.makePost = function(req, res){};


exports.rateUser = function(req, res){}; 