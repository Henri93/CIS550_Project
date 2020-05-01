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

    // let b = {business_id: "1", name: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)", neighborhood: "Planchodrome Bearbrook", address: "1490 Youville Drive", city: "", state: "", postal_code: "", latitude: 45.467134581917357, longitude: -75.546518086577947, stars: 4.2, review_count: 0, is_open: 1, categories: "Skate Park"}
    let q = 'SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = \'Users\' AND COLUMN_NAME = \'user_id\''
    let q2 = 'SELECT * FROM Users WHERE user_id=\'OKXBFnKS_qKaVG-xSWUyZQ\''
    let q3 = 'DELETE FROM Users WHERE name=\'test@test.com\''
    let q4 = 'ALTER TABLE Users MODIFY COLUMN password VARCHAR(64)'
    let q5 = 'ALTER TABLE Users MODIFY COLUMN user_id VARCHAR(255) UNIQUE'
    let q6 = 'SELECT * FROM Friends LIMIT 5;'
    let q7 = 'SELECT * FROM Users WHERE name=\'Max\' LIMIT 1;'
    let q8 = 'DELETE FROM Reviews WHERE user_id=\"test@test.com\";'

    con.query(q6,  function(err, result, fields) {
        if (err) throw (err);
        if (result) console.log(result);
    });
    con.end();
});