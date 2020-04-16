var db = require('../database/database.js');
var express = require('express')
var router = express.Router()

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
router.post('/', function (req, res) {
    //Attempt to login the user with credentials given
    var username = req.body.email;
	var password = req.body.password;
    console.log("Login attempt for " + username + " with password " + password);

	db.validateLogin(username, password, function(data, err) {
		if(data == null && err != null){
			//send error with login
			res.json({success: false, err: err});
		}else{
			//save user logged in to session
			req.session.user = username;
			req.session.authenticated = true;

			//return success
			res.json({success: true, res: data['username']});
		}
  });
})

module.exports = { 
    router:router,
    isAuthenticated:isAuthenticated
  }