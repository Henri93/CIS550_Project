const mysql = require('mysql');
var bcrypt = require('bcryptjs');

const con = mysql.createConnection({
    host: "cis550proj.cimxsfsxttk4.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "penn1741",
    port: 1521,
    database: 'cis550proj'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
});

/*
 * Function to check login credentials
 */
var myDB_validateLogin = function(username, password, route_callbck){

    if(username === "" || password === ""){
        route_callbck(null, "Please fill in username & password!");
    }

    //query db for user
    con.query(`SELECT user_id, password FROM Users WHERE name = ?;`, [username],  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length < 1){
            route_callbck(null, "This user does not exist!");
        }
        else {
            bcrypt.compare(password, result[0].password, function(err, res) {
                if(res) {
                 // Passwords match
                 route_callbck({ username : username, user_id : result[0].user_id}, null);
                } else {
                 // Passwords don't match
                 route_callbck(null, "Incorrect password!");
                } 
            });
        }
    });
};

/*
 * Function to create an account if it does not exists
 */
var myDB_createAccount = function(username, password, name, route_callbck){

    if(username === "" || password === "" || name === ""){
        route_callbck(null, "Please fill in all fields!");
    }

    con.query(`SELECT password FROM Users WHERE name = ?;`, [username],  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length < 1){
            //user doens't already exist
            bcrypt.hash(password, 10, function(err, hash) {
                // Store user in database
                //TODO the user_id should be something unquie to each person like an email
                let user = {name: username, user_id: username, password: hash}
                console.log("passwrd: " + hash)
                con.query('INSERT INTO Users SET ?', user, function(err, result, fields) {
                    if (err){
                        route_callbck(null, "Database lookup error: "+err);
                        throw (err);
                    }
                    if (result){
                        route_callbck({ username : username, user_id : username}, null);
                    } 
                });
            });
        }
        else {
            route_callbck(null, "This user already exists!");
        }
    });
};

/*
 * Function to get profile info
 * @Return user 
 */
var myDB_getProfileInfo = function(id, route_callbck){
    
    if(id.id === ""){
        route_callbck(null, "No id provided!");
    }

    //query db
    con.query(`SELECT * FROM Users u WHERE u.user_id="`+id.id+`";`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return first in list
            route_callbck(result[0], null);
        }else{
            route_callbck(null, "User profile not found");
        }
    });
}

/*
 * Function to get friends of a user
 * @Return list of friends 
 */
var myDB_getFriends = function(id, route_callbck){
    
    if(id.id === ""){
        route_callbck(null, "No id provided!");
    }

    //query db
    con.query(`SELECT f.friends, u.name FROM Friends f JOIN Users u ON f.friends = u.user_id WHERE f.user_id="`+id.id+`";`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return list
            route_callbck(result, null);
        }else{
            //no friends
            route_callbck([], null);
        }
    });
}

/*
 * Function to add friends of a user
 * @Return friend_id 
 */
var myDB_addFriend = function(user_id, friend_id, route_callbck){
    
    if(user_id === "" || friend_id === ""){
        route_callbck(null, "No id provided for adding friends!");
    }

    let friend = {user_id: user_id, friends: friend_id}

    con.query('INSERT INTO Friends SET ?', friend, function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        }
        if (result){
            route_callbck({ user_id : user_id, friend_id : friend_id}, null);
        } 
    });
}

/*
 * Function to determine if user is a friend
 * @Return friend_id 
 */
var myDB_isFriend = function(user_id, friend_id, route_callbck){
    
    if(user_id === "" || friend_id === ""){
        route_callbck(null, "No id provided for isFriend!");
    }

    con.query(`SELECT * FROM Friends f WHERE f.user_id="`+user_id+`" AND f.friends="`+friend_id+`";`, function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        }
        if (result && Array.isArray(result) && result.length > 0){
            route_callbck(true, null);
        }else{
            route_callbck(false, null);
        }
    });
}

/*
 * Function to get businesses to display on map for an area
 * @Return list of business objects
 */
var myDB_getBusinessForArea = function(area, route_callbck){
    
    if(area.lat1 === "" || area.lng1 === "" || area.lat2 === "" || area.lng2 === ""){
        route_callbck(null, "Please fill in area!");
    }

    let minLat = Math.min(area.lat1, area.lat2)
    let maxLat = Math.max(area.lat1, area.lat2)
    let minLng = Math.min(area.lng1, area.lng2)
    let maxLng = Math.max(area.lng1, area.lng2)

    //query db for business with location inside bounds
    con.query(`SELECT * FROM Business b WHERE b.latitude BETWEEN `+minLat+ `and `+maxLat+` AND b.longitude BETWEEN `+minLng+` and `+maxLng+` LIMIT 10;`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return list
            route_callbck(result, null);
        }
    });
}

/*
 * Function to get business info
 * @Return business 
 */
var myDB_getBusinessInfo = function(id, route_callbck){
    
    if(id.id === ""){
        route_callbck(null, "No id provided!");
    }

    //query db
    con.query(`SELECT * FROM Business b WHERE b.business_id="`+id.id+`";`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return first in list
            route_callbck(result[0], null);
        }
    });
}

/*
 * Function to get business and user for search bar
 * @Return list of objects with types
 */
var myDB_getSearchResult= function(term, route_callbck){
    
    if(term === ""){
        route_callbck(null, "no search term!");
    }

    con.query(`SELECT u.name, u.user_id FROM Users u WHERE u.name LIKE"`+term+`%"OR u.name LIKE"% `+term+`%" ORDER BY u.review_count DESC LIMIT 5;`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result){
            con.query(`SELECT b.name, b.business_id FROM Business b WHERE b.name LIKE"`+term+`%"OR b.name LIKE"% `+term+`%";`,  function(errB, resultBus, fields) {
                if (errB){
                    route_callbck(null, "Database lookup error: "+err);
                    throw (errB);
                } 
                if(resultBus){
                    //return list of users and businesses
                    var searchResult = []
                    for(var i = 0; i < result.length; i++){
                        searchResult.push({type: 'user', id: result[i].user_id, name: result[i].name})
                    }
                    for(var i = 0; i < resultBus.length; i++){
                        searchResult.push({type: 'business', id: resultBus[i].business_id, name: resultBus[i].name})
                    }
                    route_callbck(searchResult, null);
                }
            });
        }
    });
}

/*
 * Function to get reviews for a business
 * @Return list of review objects
 */
var myDB_getReviewsForBusiness = function(id, route_callbck){
    
    if(id.id === ""){
        route_callbck(null, "Please provide a business id!");
    }

    //query db for reviews
    con.query(`SELECT * FROM Reviews r JOIN Users u ON r.user_id = u.user_id WHERE r.business_id="`+id.id+`" ORDER BY r.date DESC;`,  function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result){
            //return list
            route_callbck(result, null);
        }
    });
}

/*
 * Function to submit reviews for a business
 * @Return submitted review
 */
var myDB_submitReviewForBusiness = function(data, route_callbck){
    
    if(data.user_id === "" || data.business_id === "" || data.reviewText === ""){
        route_callbck(null, "Please provide a enough info for a review!");
    }

    /* https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset */
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    let review_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let review = {review_id: review_id, user_id: data.user_id, business_id: data.business_id, stars: data.rating, text: data.reviewText, date: localISOTime, useful: 0, funny: 0, cool: 0}
    console.log("submitting review: " + JSON.stringify(review))

    con.query('INSERT INTO Reviews SET ?', review, function(err, result, fields) {
        if (err){
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        }
        if (result){
            route_callbck([{ rating : data.rating, reviewText : data.reviewText}], null);
        } 
    });
}

var myDB_getFriendRecs = function(userid, route_callbck){

    if(userid === ""){
        route_callbck(null, "Please fill in user_id!");
    }

    console.log("in db with userid" + userid);
  //  username = "JJ-aSuM4pCFPdkfoZ34q0Q";
      con.query(`SELECT f.friends, u.name, f.reason FROM 
                (
                    (SELECT f2.friends, CONCAT('was recommended because you both are friends with ', (SELECT name from Users WHERE user_id=f1.friends)) as reason FROM Friends f1 JOIN Friends f2 ON f1.friends=f2.user_id 
                        WHERE f1.user_id<>f2.friends AND f1.user_id='${userid}' LIMIT 3)
                    UNION
                    (SELECT business_review.user_id as friends, CONCAT('was recommended because you both have similar opinions on ', (SELECT name from Business WHERE business_id=business_review.business_id)) as reason FROM
                        (SELECT * FROM Reviews WHERE user_id='${userid}') user_review
                    JOIN
                        (SELECT * FROM Reviews r1 WHERE r1.user_id<>'${userid}' AND r1.business_id IN (SELECT DISTINCT r2.business_id FROM Reviews r2 WHERE r2.user_id='${userid}')) business_review
                    ON
                    user_review.business_id=business_review.business_id 
                    WHERE (business_review.stars BETWEEN user_review.stars-1 AND user_review.stars+1)
                    ORDER BY business_review.useful, business_review.funny, business_review.cool
                    LIMIT 3)
                ) f 
                JOIN Users u ON 
                f.friends=u.user_id ;`,  function(err, result, fields) {
        if (err){
            console.log("Lookup error");
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return list
            console.log(result);
            route_callbck(result, null);
        }
        else{
            console.log("something else is wrong?");
        }
    });
}

var myDB_getPlacesRecs = function(userid, route_callbck){

    if(userid === ""){
        route_callbck(null, "Please fill in user_id!");
    }

    console.log("in db with userid" + userid);
  //  username = "JJ-aSuM4pCFPdkfoZ34q0Q";
      con.query(`SELECT b.business_id as business, b.name, CONCAT('because ', (SELECT name FROM Users WHERE user_id=f_reviews.friends), ' likes this place') as reason 
                        FROM Business b
                        JOIN
                            (
                            SELECT * FROM Reviews r 
                            JOIN 
                            (SELECT friends FROM Friends WHERE user_id='${userid}') f 
                            ON r.user_id=f.friends 
                            WHERE r.stars>=4 
                            ORDER BY r.stars, r.useful, r.funny, r.cool DESC 
                            LIMIT 6
                            ) f_reviews
                        ON b.business_id=f_reviews.business_id;`,  function(err, result, fields) {
        if (err){
            console.log("Lookup error");
            route_callbck(null, "Database lookup error: "+err);
            throw (err);
        } 
        if(result && Array.isArray(result) && result.length > 0){
            //return list
            console.log(result);
            route_callbck(result, null);
        }
        else{
            console.log("something else is wrong?");
        }
    });
}

var database = {
    validateLogin: myDB_validateLogin,
    createAccount: myDB_createAccount,
    getProfileInfo: myDB_getProfileInfo,
    getFriends: myDB_getFriends,
    addFriend: myDB_addFriend,
    isFriend: myDB_isFriend,
    getBusinessForArea: myDB_getBusinessForArea,
    getBusinessInfo: myDB_getBusinessInfo,
    getSearchResult: myDB_getSearchResult,
    getReviewsForBusiness: myDB_getReviewsForBusiness,
    submitReviewForBusiness: myDB_submitReviewForBusiness,
    getFriendRecs: myDB_getFriendRecs,
    getPlacesRecs: myDB_getPlacesRecs
  };
  
  module.exports = database;