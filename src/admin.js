"use strict";

var constants = require(__dirname + '/constants');
var dbAdapter = require(constants.dbAdapter);

exports.changeUserPassword = function(req, res){
    var user = req.body.username;
    var newPassword = req.body.newPassword;

    dbAdapter.changePassword(user, newPassword, function(result){
        return res.json({msg: result});
    });
};

exports.deleteUser = function(req, res){
    var user = req.body.username;

    dbAdapter.removeUser(user, function(result){
        return res.json({msg: result});
    });
};

exports.removePost = function(req, res){
    
};

