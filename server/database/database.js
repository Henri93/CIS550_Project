//TODO init connection

/*
 * Function to check login credentials
 */
var myDB_validateLogin = function(username, password, route_callbck){

    if(username === "" || password === ""){
        route_callbck(null, "Please fill in username & password!");
    }

    //TODO remove this dummy line with a query to the database
    route_callbck({username: username}, null);

    // user_kvs.get(username, function (err, data) {
    //       if (err) {
    //           //user login error
    //           route_callbck(null, "Database lookup error: "+err);
    //       } else if (data == null) {
    //           //user login no data
    //           route_callbck(null, "This user does not exist!");
    //       } else {
    //           //user login exists
    //           //now check password is correct
    //           var dbUserData = JSON.parse(data[0]['value']);
    //           var dbPass = dbUserData['password'];

    //           bcrypt.compare(password, dbPass, function(err, res) {
    //             if(res) {
    //              // Passwords match
    //              route_callbck({ userInfo : data}, null);
    //             } else {
    //              // Passwords don't match
    //              route_callbck(null, "Incorrect password!");
    //             }
    //           });
    //       }
    // });
};

/*
 * Function to create an account if it does not exists
 */
var myDB_createAccount = function(username, password, name, route_callbck){

    if(username === "" || password === "" || name === ""){
        route_callbck(null, "Please fill in all fields!");
    }

    //TODO remove this dummy line with a query to the database
    route_callbck(null, "Signup backend not yet implemented!");

    // user_kvs.exists(username, function (err, data) {
    //     if (err || data == null) {
    //       //user signup error
    //       route_callbck(null, "Database lookup error: "+err);
    //     } else {
    //       if(data){
    //           route_callbck(null, "This user already exists!");
    //       }else{
    //           bcrypt.hash(password, 10, function(err, hash) {
    //             //add user to table and return result        
    //           });
    //       }
    //     }
    // });
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