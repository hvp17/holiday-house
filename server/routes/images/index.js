const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const connection = require("../../connection");

router.get("/getHouseImages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      "SELECT * FROM images WHERE house_fk = ?",
      [id],
      (err, rows) => {
        if (err) throw err;
        res.send({ status: 1, images: rows });
      }
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
