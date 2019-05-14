const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const mysqlConnection = require("./connection");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const GoogleCloudStorage = Promise.promisifyAll(
  require("@google-cloud/storage")
);

const port = 3000;

const storage = GoogleCloudStorage({
  projectId: "api-project-567469925348",
  keyFilename: "keyfile.json"
});

var BUCKET_NAME = "holiday-house";
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket(BUCKET_NAME);

// check if a file exists in bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists
var file = myBucket.file("puppy.jpeg");
file
  .existsAsync()
  .then(exists => {
    if (exists) {
      // file exists in bucket
    }
  })
  .catch(err => {
    return err;
  });

// // upload file to bucket
// // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket?method=upload
// let localFileLocation = "./public/images/zebra.gif";
// myBucket.uploadAsync(localFileLocation, { public: true }).then(file => {
//   // file saved
// });

// // get public url for file
// var getPublicThumbnailUrlForItem = file_name => {
//   return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
// };

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/user", userRoutes);

app.listen(port, () => {
  mysqlConnection.connect(() => console.log("connected"));
  console.log(`Example app listening on port ${port}!`);
});
