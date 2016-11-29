var User = require('../models/user');
"use strict";


/*
 * Return true if there exists a user in the database with the given
 * username, false otherwise.
 */
function usernameExists(user_name, callback_fcn){
	// Find user in the databse
	User.findOne({username: user_name}, function(err, user){
		// Return whether they exist or not
		var exist = (user != null);
		callback_fcn(exist);
	});
}

exports.startUp = function(req, res){
	// Check if session already exists and log in user right away
	if (req.session.hasOwnProperty("username")){
		// Login user by sending to news feed page
		res.render(__dirname + '/views/login.html');			//res.render(__dirname + '/views/newsfeed.html');	change it to this later
	} else {
		// User not logged in, send to login page
		res.render(__dirname + '/views/login.html');
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
		return res.json({msg: "ERROR: username and password required"});
	} else {

		User.findOne({username: req.body.username}, function(err, user){
        	if (err) throw err;
        	// Check if user exists
        	if (user == null){
        		return res.json({msg: "ERROR: Username incorrect"});
        	} else if (user.pass != req.body.pass){
        		// Check if password is correct
        		return res.json({msg: "ERROR: Password incorrect"});
        	} else {
        		// Login the user, by adding to the session
        		req.session.username = req.body.username;
        		return res.json({msg: "success"});
        	}	
    	});
	}
};


exports.logout = function(req, res){
	req.session = null;
	// Do more work here
	res.send('success');
};



exports.register = function(req, res){
	
	// Check if proper fields were passed in
	if (!req.body.hasOwnProperty('username') ||
	   	!req.body.hasOwnProperty('pass') ||
	   	!req.body.hasOwnProperty('fname') ||
	   	!req.body.hasOwnProperty('lname') ||
	   	!req.body.hasOwnProperty('aboutme')){
		return res.json({msg: "ERROR: Fields missing"});
	}

	// Check if a user with this username already exists
	usernameExists(req.body.username, function(username_exists){
		if(username_exists){
			return res.json({msg: "ERROR: Username already exists"});
		} else {
			// Create the new user
			var newUser = {
				'username': req.body.username,
				'pass': req.body.pass,
				'fname': req.body.fname,
				'lname': req.body.lname,
				'aboutme': req.body.aboutme,
				'posts': [],
				"avgRating": 0,
		        "numOfRatings": 0
			};

			// Login the user through the session
			req.session.username = req.body.username;
			// Add new user to the database
			var newUserObj = new User(newUser);
			newUserObj.save(function(err, newBook) {
		        if (err) throw err;

		        res.json({msg: "success"});
		    });
		}

	});
};


exports.newsFeed = function(req, res){
	// If logged in
	if (req.session.hasOwnProperty("username")){
		console.log(req.session.username);
		res.render(__dirname + '/views/newsfeed.html');
	} else {
		res.render(__dirname + '/views/login.html');
	}
};


exports.allPosts = function(req, res){};


exports.getUserByName = function(req, res){};


exports.getPostsForUser = function(req, res){};


exports.makePost = function(req, res){};


exports.rateUser = function(req, res){}; 


exports.test = function(req, res){							// TODO DELETE THIS FUNCTION LATER
	User.find({}, function(err, allUsers) {
        if (err) throw err;
        console.log(allUsers);
        res.send(allUsers)
    });
};