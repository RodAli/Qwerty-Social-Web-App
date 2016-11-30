var constants = require("./constants");
var User = require('../models/user');

/*
 * Return true if there exists a user in the database with the given
 * username, false otherwise.
 */
exports.getUserExists = function(user_name, callback){
    // Find user in the databse
    User.findOne({username: user_name}, function(err, user){
        // Return whether they exist or not
        var exist = (user !== null);
        callback(exist);
    });
};


exports.getUserByUsername = function(user_name, callback){
    User.findOne({username: user_name}, function(err, user){
        if (err) throw err;
        callback(user);
    });
};

exports.getPostsForUser = function(name, callback){};


exports.addNewUser = function(newUser, callback){
    var newUserObj = new User(newUser);
    newUserObj.save(function(err, newBook) {
        if (err) throw err;

        callback(constants.SUCCESS);
    });
};


exports.saveUser = function(user, callback){
    user.save(function(err, newBook) {
        if (err) throw err;

        callback(constants.SUCCESS);
    });
};

exports.allUsers = function(callback){                  // DELETE THIS FUNCTION LATER
    User.find({}, function(err, allUsers) {
        if (err) throw err;
        callback(allUsers);
    });
};