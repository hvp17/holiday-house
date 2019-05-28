const express = require("express");
const router = express.Router();

const connection = require("../../connection");

router.get("/getTypes", async (req, res) => {
  try {
    const { id } = req.params;
    connection.query("SELECT * FROM types", [id], (err, rows) => {
      if (err) throw err;
      res.send({ status: 1, types: rows });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
