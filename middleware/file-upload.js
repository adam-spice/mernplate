const multer = require("multer");
const uuid = require("uuid");
var multerGoogleStorage = require("multer-google-storage");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const fileUpload = multer({
  limits: 500000,
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    keyFilename: "./key.json",
    projectId: `${process.env.GOOGLE_PROJECT_ID}`,
    bucket: `${process.env.GOOGLE_PROJECT_ID}`,
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v1() + "." + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  }
});

module.exports = fileUpload;
