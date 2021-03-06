const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Promise = require("bluebird");
const connection = require("../../connection");
const { uploadImage, resizeAndUploadImage } = require("../images/helpers");

// Get all houses
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM houses", (err, rows) => {
      if (err) throw err;
      res.send({ status: 1, houses: rows });
    });
  } catch (error) {
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
    error;
    res.send({ status: 0, message: error.message });
  }
});

// Get specific house by ID
router.get("/one/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ ok: 0, message: "No ID is provided" });
    connection.execute(
      "SELECT houses.*, users.email AS userEmail, users.phone as userPhone, users.name as userName FROM houses INNER JOIN users ON houses.user_fk = users.id WHERE houses.id = ?",
      [id],
      (err, rows) => {
        if (err) throw err;
        res.send({ status: 1, house: rows });
      }
    );
  } catch (error) {
    res.send({ status: 0, message: error.msg });
  }
});

// Create a multer storage for images
var storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Handle image upload from the web server
router.post("/create", upload.array("images[]"), (req, res) => {
  try {
    const user = jwt.decode(req.header("x-token"));
    const formValues = JSON.parse(req.body.form_values);
    const {
      txtTitle,
      txtDescription,
      txtAddress,
      txtHouseType,
      txtStartDate,
      txtEndDate,
      user_fk,
      txtSmoker,
      txtFamily,
      txtRooms,
      txtPrice
    } = formValues;
    connection.beginTransaction(function(err) {
      if (err) {
        return res.send({ status: 0, message: err.message });
      }
      connection.query(
        "INSERT INTO `houses` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          null,
          txtTitle,
          txtDescription,
          txtAddress,
          txtHouseType ? txtHouseType : 1,
          txtStartDate,
          txtEndDate,
          user.id,
          txtRooms,
          txtSmoker === "on" ? true : false,
          txtFamily === "on" ? true : false,
          txtPrice ? Number(txtPrice) : 0
        ],
        function(err, result) {
          if (err) {
            connection.rollback(function() {
              res.send({ status: 0, message: err.message });
            });
          }
          let links = [];

          Promise.map(req.files, file =>
            resizeAndUploadImage(file.path, file.filename)
          ).then(resizedLinks => {
            links = [...links, ...resizedLinks.map(x => x.path)];
            Promise.map(req.files, file =>
              uploadImage(file.path, file.filename)
            ).then(fullSizeLinks => {
              links = [...links, ...fullSizeLinks];

              links.forEach(link => {
                connection.query(
                  "INSERT INTO `images` VALUES (?, ?, ?)",
                  [null, result.insertId, link],
                  function(err, result) {
                    if (err) {
                      connection.rollback(function() {
                        res.send({ status: 0, message: err.message });
                      });
                    }
                  }
                );
              });

              connection.commit(function(err) {
                if (err) {
                  connection.rollback(function() {
                    res.send({ status: 0, message: err.message });
                  });
                }

                res.send({
                  status: 1,
                  message: "Successfully created house!"
                });
              });
            });
          });
        }
      );
    });
    /* End transaction */
  } catch (error) {
    return res.send({ status: 0, message: error.message });
  }
});

// Delete house by the ID
router.get("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ ok: false, msg: "No ID is provided" });
    connection.execute("DELETE FROM houses WHERE id = ?", [id], (err, rows) => {
      if (err) throw err;
      res.send({ ok: true, data: rows });
    });
  } catch (error) {
    res.send({ ok: false, msg: error.msg });
  }
});

module.exports = router;
