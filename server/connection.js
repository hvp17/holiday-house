const mysql = require("mysql2");

//local mysql db connection
const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.DB_PORT,
  user: "root",
  password: "root",
  database: "holiday-house"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to MySQL!");
});

module.exports = connection;
