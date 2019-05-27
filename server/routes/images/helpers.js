const { Storage } = require("@google-cloud/storage");
const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);

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

const sharp = require("sharp");

const resizeAndUploadImage = (path, name) => {
  return new Promise((resolve, reject) => {
    const resizedImgPath = `./uploads/thumbnail_${name}`;
    sharp(path)
      .resize({ height: 200 })
      .toFile(resizedImgPath)
      .then(() => {
        uploadImage(resizedImgPath).then(newName => {
          unlinkAsync(resizedImgPath).then(() => {
            return resolve(newName);
          });
        });
      })
      .catch(err => reject(err));
  });
};
const uploadImage = (path, name) => {
  return new Promise((resolve, reject) => {
    storage
      .bucket(BUCKET_NAME)
      .upload(path, {
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
      .then(response => {
        // unlinkAsync(path).then(() => {
        return resolve(getPublicUrlForItem(response[0].metadata.name));
        // });
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  uploadImage,
  resizeAndUploadImage
};
