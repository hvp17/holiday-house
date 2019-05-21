const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const connection = require("../../connection");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/register", (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log("values: ", req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    connection.execute(
      "INSERT INTO `users` (`name`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?);",
      [name, email, phone, hashedPassword],
      (err, response) => {
        if (err || response.affectedRows < 1)
          res.send({
            status: 1,
            message: `Failed to register. ${err.message && err.message}`
          });
        const token = jwt.sign(
          { email, id: response.insertId },
          process.env.SECRET
        );

        console.log(token);
        res.send({ status: 1, token });
        if (err) throw err;
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    connection.execute(
      "SELECT * FROM users WHERE email=?",
      [email],
      (err, rows) => {
        console.log(rows);
        const user = rows[0];
        if (bcrypt.compareSync(password, user.password)) {
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
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
