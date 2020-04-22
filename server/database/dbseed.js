//Sanity check for ensuring that we can connect to the database
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "cis550proj.cimxsfsxttk4.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "penn1741",
    port: 1521,
    database: 'cis550proj'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // let b = {name: "Bearbrook Skateboard Park", neighborhood: "Planchodrome Bearbrook", address: "8720 Russell Road", city: "", state: "", postal_code: "", latitude: -75.3372987731628, longitude: 45.383321536272049, stars: 3.0, review_count: 0, is_open: 1, categories: "Skate Park"}

    con.query('SELECT * FROM Business', function(err, result, fields) {
        if (err) throw (err);
        if (result) console.log(result);
    });
    con.end();
});