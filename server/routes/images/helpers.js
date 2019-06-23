const { Storage } = require("@google-cloud/storage");
const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);

const storage = new Storage({
  projectId: "api-project-567469925348",
  keyFilename: "key.json"
});

var BUCKET_NAME = "holiday-house";

// get public url for file
const getPublicUrlForItem = file_name => {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
};

const sharp = require("sharp");

// Resize image to thumbnail size and then upload it
// to GCloud bucket
const resizeAndUploadImage = (path, name) => {
  return new Promise((resolve, reject) => {
    const resizedImgPath = `./uploads/thumbnail_${name}`;
    sharp(path)
      .resize({ width: 400 })
      .toFile(resizedImgPath)
      .then(meta => {
        uploadImage(resizedImgPath).then(newName => {
          unlinkAsync(resizedImgPath).then(() => {
            return resolve({ path: newName, meta });
          });
        });
      })
      .catch(err => reject(err));
  });
};

// Receive a single file form GCloud bucket by name
const getFile = async name => {
  const response = await storage
    .bucket(BUCKET_NAME)
    .file(name)
    .exists();
  return response[0];
};

// Upload image to Gcloud by local path
const uploadImage = path => {
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

// Remove image from GCloud bucket by name
const deleteImage = name => {
  return new Promise((resolve, reject) => {
    storage
      .bucket(BUCKET_NAME)
      .file(name)
      .delete()
      .then(response => {
        // unlinkAsync(path).then(() => {
        return resolve({ status: 1 });
        // });
      })
      .catch(err => reject({ status: 0 }));
  });
};

module.exports = {
  getPublicUrlForItem,
  deleteImage,
  getFile,
  uploadImage,
  resizeAndUploadImage
};
