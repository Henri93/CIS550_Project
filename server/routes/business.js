var db = require('../database/database.js');
var express = require('express')

/*
 * Route for returning businesses for homepage
 */
let getHomeBusinesses = function(req, res, next) {
    var lat1 = req.query.lat1;
    var lng1 = req.query.lng1;

    var lat2 = req.query.lat2;
    var lng2 = req.query.lng2;

    db.getBusinessForArea({lat1: lat1, lng1: lng1, lat2: lat2, lng2: lng2}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else if(data.length > 0){
            //serve businesses to front-end to set state
            res.json({success: true, businesses: data});
        }else{
            //no businesses in area...might want to send a special message
            res.json({success: true, businesses: []});
        }
      });
}

module.exports = { 
    getHomeBusinesses: getHomeBusinesses
}