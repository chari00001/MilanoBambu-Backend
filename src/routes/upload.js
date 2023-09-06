const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getImage } = require("../controllers/upload");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", getImage);
router.post("/", upload.array("images"), uploadImage);

module.exports = router;
