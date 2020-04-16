//TODO init connection

/*
 * Function to check login credentials
 */
var myDB_validateLogin = function(username, password, route_callbck){

    if(username === "" || password === ""){
        route_callbck(null, "Please fill in username & password!");
    }

    //TODO remove this dummy line with a query to the database
    // route_callbck(null, "Dummy error");
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

var database = {
    validateLogin: myDB_validateLogin
  };
  
  module.exports = database;