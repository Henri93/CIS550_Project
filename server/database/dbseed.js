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

    con.query(`SELECT * FROM Users;`, function(err, result, fields) {
        if (err) throw (err);
        if (result) console.log(result);
    });
    con.end();
});