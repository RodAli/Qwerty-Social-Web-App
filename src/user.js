"use strict";

var constants = require(__dirname + '/constants');
var dbAdapter = require(constants.dbAdapter);


exports.startUp = function(req, res){
	// Check if session already exists and log in user right away
	if (req.session.hasOwnProperty("username")){
		// Login user by sending to news feed page
		res.render(constants.userViewPage);
	} else {
		// User not logged in, send to login page
		res.render(constants.loginPage);
	}
};


exports.login = function(req, res){
	if (!req.body.hasOwnProperty('username') ||
	   	!req.body.hasOwnProperty('pass')){
		return res.json({msg: "ERROR: username and password required"});
	} else {
		dbAdapter.getUserByUsername(req.body.username, function(user){
        	
        	// Check if user exists
        	if (user === null){
        		return res.json({msg: "ERROR: Username incorrect"});
        	} else if (user.pass !== req.body.pass){
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
	// Remove the logged in session
	req.session = null;
	res.json({msg: 'success'});
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
	dbAdapter.getUserExists(req.body.username, function(username_exists){
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
			dbAdapter.addNewUser(newUser, function(result){
				res.json({msg: result});
			});
		}
	});
};


exports.newsFeed = function(req, res){
	// If logged in
	if (req.session.hasOwnProperty("username")){
		res.render(constants.userViewPage);
	} else {
		res.render(constants.loginPage);
	}
};


exports.allPosts = function(req, res){};



exports.makePost = function(req, res){};


exports.rateUser = function(req, res){
	if (!req.body.hasOwnProperty("username") ||
		!req.body.hasOwnProperty("rating")){
		return res.json({msg: "ERROR: Fields not met"});
	} else {
		dbAdapter.getUserByUsername(req.body.username, function(user){
			// Calculate the new average for this user
			console.log(user);
			var new_average = user.avgRating;
			new_average = new_average * user.numOfRatings;
			new_average += req.body.rating;
			user.numOfRatings += 1;
			new_average = new_average / user.numOfRatings;
			user.avgRating = new_average;
			// Update the user in the database
			dbAdapter.saveUser(user, function(){
				return res.json({msg: "Success", avg: new_average});
			});
		});
	}
}; 

/*
 * Send back the JSON object of the user that is currently logged in.
 */
exports.getCurrentUser = function(req, res){
	// Check if the user is logged in
	if (!req.session.username){
		return res.json({msg: "ERROR: User not logged in"});
	} else {
		// Get the object for this user from the database
		dbAdapter.getUserByUsername(req.session.username, function(user){
			if (user === null){
				return res.json({msg: "ERROR: User logged in not found"});
			} else {
				// Send back the user if found
				return res.json(user);
			}
		});
	}
};


/*
 * Get a json object of a user by passing in the username as a query.
 */
exports.getUser = function(req, res){
	var username = null;
	// if query is passed in get profile for that user
	if (req.query.user){
		username = req.query.user;
	} else if (req.session.hasOwnProperty("username")){
		// Sign in the user that is logged in
		username = req.session.username;
	}

	if (username != null){
		dbAdapter.getUserByUsername(username, function(user){
			if (user == null){
				return res.json({msg: "ERROR: User not found"});
			} else {
				return res.json(user);
			}
		});
	} else {
		return res.json({msg: "ERROR: User not passed in"});
	}
};


exports.test = function(req, res){							// TODO DELETE THIS FUNCTION LATER
	dbAdapter.allUsers(function(allUsers){
		console.log(allUsers);
		res.send(allUsers);
	});
};