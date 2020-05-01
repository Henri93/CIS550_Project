var db = require('../database/database.js');
var express = require('express')

// middleware that checks if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.authenticated)
        return next();
    
    // if not authenticated then redirect to login
    res.redirect('/');
}

/*
 * Route for checking login credentials
 */
let login = function(req, res, next) {
    //Attempt to login the user with credentials given
    var username = req.body.email;
    var password = req.body.password;
    console.log("Login attempt for " + username + " with password " + password);
    
    db.validateLogin(username, password, function(data, err) {
        if(data == null && err != null){
            //send error with login
            res.json({success: false, err: err});
        }else{
            console.log(data)
            //save user logged in to session
            req.session.user = username;
            req.session.authenticated = true;

            //return success
            res.json({success: true, res: data});
        }
    });
}

/*
 * Route for getting a profile by user_id
 */
let getProfile = function(req, res, next) {
    var id = req.query.id;
    
    db.getProfileInfo({id: id}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else{
            res.json({success: true, profile: data});
        }
      });
}

/*
 * Route for creating a user when signing up
 */
let signup = function(req, res, next) {
	var username = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

	db.createAccount(username, password, name, function(data, err) {
		if(data == null && err != null){
			//error signing up
			res.json({success: false, err: err});
		}else{
			//save user logged in to session
            req.session.user = username;
            req.session.authenticated = true;
            
            //return success
            res.json({success: true, res: data});
		}
  	});
};

/*
 * Route for getting friends of a user_id
 */
let getFriends = function(req, res, next) {
    var id = req.query.id;
    
    db.getFriends({id: id}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else{
            res.json({success: true, friends: data});
        }
      });
}

/*
 * Route for adding friends for a user
 */
let addFriend = function(req, res, next) {
	var user_id = req.body.user_id;
	var friend_id = req.body.friend_id;
	
	db.addFriend(user_id, friend_id, name, function(data, err) {
		if(data == null && err != null){
			//error signing up
			res.json({success: false, err: err});
		}else{
            //return success
            res.json({success: true, res: data});
		}
  	});
};

/*
 * Route for determining if user is a friend
 */
let isFriend = function(req, res, next) {
	var user_id = req.query.user_id;
	var friend_id = req.query.friend_id;
	
	db.isFriend(user_id, friend_id, function(data, err) {
		if(data == null && err != null){
			//error signing up
			res.json({success: false, err: err});
		}else{
            //return success
            res.json({success: true, isFriend: data});
		}
  	});
};

module.exports = { 
    login: login,
    getProfile: getProfile,
    getFriends: getFriends,
    signup: signup,
    addFriend: addFriend,
    isFriend: isFriend,
    isAuthenticated:isAuthenticated
}