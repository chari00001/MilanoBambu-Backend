const Image = require("../models/Image.js");

const uploadImage = async (req, res) => {
  const resultArray = [];
  for (let i = 0; i < req.files.length; i++) {
    await Image.create({ image: req.files[i].filename })
      .then((result) => {
        resultArray.push(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          success: false,
          result: err,
        });
      });
  }
  res.status(200).json({
    success: true,
    result: resultArray,
  });
};

const getImage = async (req, res) => {
  Image.find()
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        result: err,
      });
    });
};

module.exports = {
  uploadImage,
  getImage,
};
