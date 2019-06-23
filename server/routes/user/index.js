const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const connection = require("../../connection");

// Get a list of all users
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  } catch (error) {
    res.send(error);
  }
});

// Perform user signup
router.post("/register", (req, res) => {
  try {
    const { txtName, txtEmail, txtPhone, txtPassword } = req.body;
    "values: ", req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(txtPassword, salt);
    connection.execute(
      "INSERT INTO `users` (`name`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?);",
      [txtName, txtEmail, txtPhone, hashedPassword],
      (err, response) => {
        if (err || response.affectedRows < 1)
          res.send({
            status: 1,
            message: `Failed to register. ${err.message && err.message}`
          });
        const token = jwt.sign(
          { txtEmail, id: response.insertId },
          process.env.SECRET
        );

        res.send({ status: 1, token });
        if (err) throw err;
      }
    );
  } catch (error) {
    res.send(error);
  }
});

// Perform user login
router.post("/login", (req, res) => {
  try {
    const { txtEmail, txtPassword } = req.body;

    connection.execute(
      "SELECT * FROM users WHERE email=?",
      [txtEmail],
      (err, rows) => {
        if (rows.length < 1)
          return res.send({ status: 0, message: "Failed to login" });
        const user = rows[0];
        if (bcrypt.compareSync(txtPassword, user.password)) {
          const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.SECRET
          );
          res.send({ status: 1, token });
        } else {
          res.send({ status: 0, message: "Invalid login credentials" });
        }
        if (err) throw err;
      }
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
