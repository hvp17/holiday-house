const mysql = require("mysql2");

//local mysql db connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "holiday-house"
});

module.exports = connection;
