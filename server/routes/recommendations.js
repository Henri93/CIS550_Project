var db = require('../database/database.js');
var express = require('express')

/*
 * Route for returning recs
 */
let getFriendRecs = function(req, res, next) {  
    var userid = req.params.userid;
    console.log("getting recs in for " + userid)
    db.getFriendRecs(userid, function(data, err) {
        if(data.length > 0){
            //good to go: friend based recs exist
            console.log("successful data retrieval in server");
            res.json({success: true, recs: data, source: "friends"});
        }else{
            //empty
            console.log("unsuccessful data retrieval in server")
            res.json({success: false, recs: [], source: "friends"});
        }
      });
}

module.exports = { 
    getFriendRecs: getFriendRecs,
}