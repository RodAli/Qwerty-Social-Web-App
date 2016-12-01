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


exports.getUserByFullName = function(fullname, callback){
    var name_array = fullname.split(" ");
    User.findOne({fname: name_array[0], lname: name_array[1]}, function(err, user){
        if (err) throw err;
        callback(user);
    });
};


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

//----------ADMIN-----------
exports.changePassword = function(user, newPassword, callback){
    var result = User.update({'username' : user}, {$set:{'pass':newPassword}});

    if (result.nModified === 1){
        callback(constants.SUCCESS);
    } else {
        callback(constants.ERROR);
    }
};

exports.removeUser = function(user, callback){
    var result = User.remove({'username': user});

    if (err) throw err;

    if (result.nRemoved === 1){
        callback(constants.SUCCESS);
    } else {
        callback(constants.ERROR);
    }
};


exports.allUsers = function(callback){                  // DELETE THIS FUNCTION LATER
    User.find({}, function(err, allUsers) {
        if (err) throw err;
        callback(allUsers);
    });
};
