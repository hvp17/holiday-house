const express = require("express");
const router = express.Router();

const connection = require("../../connection");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM houses", (err, rows) => {
      if (err) throw err;
      res.send({ ok: true, data: rows });
    });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, msg: error.message });
  }
});

router.get("/one/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ ok: false, msg: "No ID is provided" });
    connection.execute(
      "SELECT * FROM houses WHERE id = ?",
      [id],
      (err, rows) => {
        if (err) throw err;
        res.send({ ok: true, data: rows });
      }
    );
  } catch (error) {
    console.log(error);
    res.send({ ok: false, msg: error.msg });
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

    connection.execute(
      `INSERT INTO "houses" ("title",
                             "description", 
                             "address", 
                             "type_id", 
                             "start_date", 
                             "end_date", 
                             "user_id", 
                             "rooms", 
                             "smoker_friendly", 
                             "family_friendly
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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

module.exports = router;
