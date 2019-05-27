const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const MulterGoogleCloudStorage = require("multer-google-storage");
const connection = require("../../connection");
const { uploadImage } = require("../images/helpers");

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

router.get("/filtered", (req, res) => {
  const { type } = req.params;
  try {
    connection.query("SELECT * FROM houses ", (err, rows) => {
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
    if (!id) res.send({ ok: 0, message: "No ID is provided" });
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

var storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post("/create", upload.array("images[]"), (req, res) => {
  try {
    const {
      title,
      description,
      address,
      type_fk,
      start_date,
      end_date,
      user_fk,
      rooms,
      smoker_friendly,
      family_friendly
    } = req.body;

    console.log("files", req.body);
    console.log("files2", req.files);
    const links = [];
    req.files.forEach(file => {
      const link = uploadImage(file.path);
      links.push(link);
    });
    res.send(links);
    // res.json({ fileName: req.file.filename });
    // res.end();
    // res.send(req.body);
    return;
    /* Begin transaction */
    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }
      connection.query("INSERT INTO images SET name=?", "sameer", function(
        err,
        result
      ) {
        if (err) {
          connection.rollback(function() {
            throw err;
          });
        }

        connection.query(
          "INSERT INTO `houses` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            25,
            title,
            description,
            address,
            type_fk,
            start_date,
            end_date,
            user_fk,
            rooms,
            smoker_friendly,
            family_friendly
          ],
          function(err, result) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            connection.commit(function(err) {
              if (err) {
                connection.rollback(function() {
                  throw err;
                });
              }
              console.log("Transaction Complete.");
              connection.end();
            });
          }
        );
      });
    });
    /* End transaction */
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ ok: false, msg: "No ID is provided" });
    connection.execute("DELETE FROM houses WHERE id = ?", [id], (err, rows) => {
      if (err) throw err;
      res.send({ ok: true, data: rows });
    });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, msg: error.msg });
  }
});

module.exports = router;
