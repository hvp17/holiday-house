const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "api-project-567469925348",
  keyFilename: "key.json"
});

var BUCKET_NAME = "holiday-house";
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket(BUCKET_NAME);
// check if a file exists in bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists

// // upload file to bucket
// // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket?method=upload
// let localFileLocation = "./public/images/zebra.gif";
// myBucket.uploadAsync(localFileLocation, { public: true }).then(file => {
//   // file saved
// });

// get public url for file
var getPublicUrlForItem = file_name => {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
};

const connection = require("../../connection");

router.get("/getHouseImages", async (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      "SELECT * FROM images WHERE house_id = ?",
      [id],
      (err, rows) => {
        if (err) throw err;
        res.send(rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/1", async (req, res) => {
  const options = {
    version: "v4", // defaults to 'v2' if missing.
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 // one hour
  };

  // Get a v2 signed URL for the file
  const [url] = await storage
    .bucket(BUCKET_NAME)
    .file("puppy.jpeg")
    .getSignedUrl(options);

  res.send(url);
});

router.get("/upload", (req, res) => {
  try {
    // let localFileLocation = "./public/images/zebra.gif";
    // myBucket.uploadAsync("../../../puppy.jpeg", { public: true }).then(file => {
    //   console.log("saved");
    // });
    storage
      .bucket(BUCKET_NAME)
      .upload(path.join(__dirname, "puppy1.jpeg"), {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        public: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: "public, max-age=31536000"
        }
      })
      .then(response =>
        res.send(getPublicUrlForItem(response[0].metadata.name))
      )
      .catch(err => console.log(err));
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
