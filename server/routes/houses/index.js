const express = require("express");
const router = express.Router();

const multer = require("multer");
const Promise = require("bluebird");
const connection = require("../../connection");
const { uploadImage, resizeAndUploadImage } = require("../images/helpers");

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
      "SELECT houses.*, users.email AS userEmail, users.phone as userPhone, users.name as userName FROM houses INNER JOIN users ON houses.user_fk = users.id WHERE houses.id = ?",
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
    console.log(formValues);
    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
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
          user_fk ? user_fk : 7,
          txtRooms,
          txtSmoker === "on" ? true : false,
          txtFamily === "on" ? true : false,
          txtPrice ? Number(txtPrice) : 0
        ],
        function(err, result) {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }
          console.log("x", result);
          let links = [];

          Promise.map(req.files, file =>
            resizeAndUploadImage(file.path, file.filename)
          ).then(resizedLinks => {
            links = [...links, ...resizedLinks];
            Promise.map(req.files, file =>
              uploadImage(file.path, file.filename)
            ).then(fullSizeLinks => {
              links = [...links, ...fullSizeLinks];

              links.forEach(link => {
                console.log("inserting LINK: ", link);
                connection.query(
                  "INSERT INTO `images` VALUES (?, ?, ?)",
                  [null, result.insertId, link],
                  function(err, result) {
                    if (err) {
                      connection.rollback(function() {
                        throw err;
                      });
                    }
                  }
                );
              });

              connection.commit(function(err) {
                if (err) {
                  connection.rollback(function() {
                    throw err;
                  });
                }
                console.log("Transaction Complete.");
                res.send({
                  stateus: 1,
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
