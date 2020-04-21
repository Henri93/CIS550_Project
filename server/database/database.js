const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
    con.query(`SELECT password FROM Users WHERE name = ?;`, [username],  function(err, result, fields) {
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
                 route_callbck({ username : username}, null);
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
                let user = {name: username, password: hash}
                con.query('INSERT INTO Users SET ?', user, function(err, result, fields) {
                    if (err){
                        route_callbck(null, "Database lookup error: "+err);
                        throw (err);
                    }
                    if (result){
                        route_callbck({ username : username}, null);
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
 * Function to get businesses to display on map for an area
 * @Return list of business objects
 */
var myDB_getBusinessForArea = function(area, route_callbck){
    //TODO add query that returns businesses
    
    //dummy return of businesses
    route_callbck([
        
    ], null);
}

var database = {
    validateLogin: myDB_validateLogin,
    createAccount: myDB_createAccount,
    getBusinessForArea: myDB_getBusinessForArea
  };
  
  module.exports = database;