require("isomorphic-fetch");

const {
  getPublicUrlForItem,
  uploadImage,
  deleteImage,
  getFile,
  resizeAndUploadImage
} = require("./helpers");
const path = require("path");

const fileName = "puppy-11-23-412231.jpeg";
const thumbnailName = `thumbnail_${fileName}`;

test("Formats image name to public accessable url", () => {
  expect(getPublicUrlForItem(fileName)).toBe(
    "https://storage.googleapis.com/holiday-house/puppy-11-23-412231.jpeg"
  );
});

test("Image does not exist before upload", async () => {
  const doesExistBeforeUpload = await getFile(fileName);
  expect(doesExistBeforeUpload).toBe(false);
});

test("Resizes and uploads thumbnail image to Google Cloud", async () => {
  const { path: imgPath, meta } = await resizeAndUploadImage(
    path.join(__dirname, fileName),
    fileName
  );
  expect(meta.width).toBe(400);

  const doesExist = await getFile(thumbnailName);
  expect(doesExist).toBe(true);
});

test("Deletes thumbnail from Google Cloud", async () => {
  const doesExistBeforDelete = await getFile(thumbnailName);
  expect(doesExistBeforDelete).toBe(true);
  await deleteImage(thumbnailName);
  const doesExist = await getFile(thumbnailName);
  expect(doesExist).toBe(false);
});

test("Uploads full size image to Google Cloud", async () => {
  await uploadImage(path.join(__dirname, fileName));
  const doesExist = await getFile(fileName);
  expect(doesExist).toBe(true);
});

test("Deletes full size image from Google Cloud", async () => {
  const doesExistBeforDelete = await getFile(fileName);
  expect(doesExistBeforDelete).toBe(true);
  await deleteImage(fileName);
  const doesExist = await getFile(fileName);
  expect(doesExist).toBe(false);
});
