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
    const hashedPassword = bcrypt.hashSync(password, 10);
    connection.execute(
      "INSERT INTO `users` (`name`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?);",
      [name, email, phone, hashedPassword],
      (err, response) => {
        if (err || response.affectedRows < 1)
          res.send({
            ok: false,
            msg: `Failed to register. ${err.message && err.message}`
          });
        const token = jwt.sign(user.email, process.env.SECRET);
        res.send({ ok: true, token });
        if (err) throw err;
        res.send(rows);
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
          const token = jwt.sign(user.email, process.env.SECRET);
          res.send({ ok: true, token });
        } else {
          res.send({ ok: false, msg: "Invalid login credentials" });
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
