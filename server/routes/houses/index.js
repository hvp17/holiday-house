const express = require("express");
const router = express.Router();
const connection = require("../../connection");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM houses", (err, rows) => {
      if (err) throw err;
      res.send({ status: 1, houses: rows });
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, message: error.message });
  }
});

router.get("/one/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ status: 0, message: "No ID is provided" });
    connection.execute(
      "SELECT * FROM houses WHERE id = ?",
      [id],
      (err, rows) => {
        if (err) throw err;
        res.send({ status: 1, house: rows });
      }
    );
  } catch (error) {
    console.log(error);
    res.send({ status: 0, message: error.msg });
  }
});

router.post("/create", (req, res) => {
  try {
    const {
      title,
      description,
      address,
      type_id,
      start_date,
      end_date,
      user_id,
      rooms,
      smoker_friendly,
      family_friendly
    } = req.body;

    connection.query(
      "INSERT INTO `houses` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        25,
        title,
        description,
        address,
        type_id,
        start_date,
        end_date,
        user_id,
        rooms,
        smoker_friendly,
        family_friendly
      ],
      (err, response) => {
        console.log(req.body);
        if (err || response.affectedRows < 1) {
          res.send({
            status: 0,
            message: `Failed to create house. ${err.message && err.message}`
          });
        }
        res.send({ status: 1 });
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ status: 0, msg: "No ID is provided" });
    connection.execute("DELETE FROM houses WHERE id = ?", [id], (err, rows) => {
      if (err) throw err;
      res.send({ status: 1, data: rows });
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 0, msg: error.msg });
  }
});

module.exports = router;
