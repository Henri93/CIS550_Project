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

/*
 * Route for returning business' info
 */
let getBusinessInfo = function(req, res, next) {
    var id = req.query.id;
    
    db.getBusinessInfo({id: id}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else{
            res.json({success: true, business: data});
        }
      });
}

/*
 * Route for returning businesses and users for search
 */
let getSearchResult = function(req, res, next) {
    var term = req.query.term;
    
    db.getSearchResult(term, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else if(data.length > 0){
            //serve reviews to front-end to set state
            res.json({success: true, result: data});
        }else{
            //no reviews for business...might want to send a special message
            res.json({success: true, result: []});
        }
      });
}

/*
 * Route for returning reviews for business
 */
let getReviewsForBusiness = function(req, res, next) {
    var id = req.query.id;
    
    db.getReviewsForBusiness({id: id}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else if(data.length > 0){
            //serve reviews to front-end to set state
            res.json({success: true, reviews: data});
        }else{
            //no reviews for business...might want to send a special message
            res.json({success: true, reviews: []});
        }
      });
}

/*
 * Route for submitting reviews for business
 */
let submitReview = function(req, res, next) {
    let user_id = req.body.user_id;
    let business_id = req.body.business_id;
    let rating = req.body.rating;
    let reviewText = req.body.reviewText;
    
    db.submitReviewForBusiness({user_id: user_id, business_id: business_id, rating: rating, reviewText: reviewText}, function(data, err) {
        if(data == null && err != null){
            //error getting businesses of area
            res.json({success: false, err: err});
        }else if(data.length > 0){
            //serve reviews to front-end to set state
            res.json({success: true});
        }else{
            //no reviews for business...might want to send a special message
            res.json({success: false, err: "failed to submit review!"});
        }
      });
}

module.exports = { 
    getHomeBusinesses: getHomeBusinesses,
    getBusinessInfo: getBusinessInfo,
    getSearchResult: getSearchResult,
    getReviewsForBusiness: getReviewsForBusiness,
    submitReview: submitReview
}