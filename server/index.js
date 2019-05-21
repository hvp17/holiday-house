require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const housesRoutes = require("./routes/houses");
const bodyParser = require("body-parser");
const port = 3000;
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

// // get public url for file
// var getPublicThumbnailUrlForItem = file_name => {
//   return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
// };

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/houses", housesRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
