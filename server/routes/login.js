var express = require('express')
var router = express.Router()

// middleware that checks if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.authenticated)
        return next();
    
    // if not authenticated then redirect to login
    res.redirect('/login');
}
  
// define the login route
router.get('/', function (req, res) {
  res.send('You are not logged in to access this page')
})

router.post('/', function (req, res) {
    //Attempt to login the user with credentials given
    //TODO implement this logic
    console.log("Login attempt for " + req.body.email + " with password " + req.body.password)
    res.json({success: true});
})

module.exports = { 
    router:router,
    isAuthenticated:isAuthenticated
  }