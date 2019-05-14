const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User root route works!");
});

module.exports = router;
