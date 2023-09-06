const Product = require("../models/Product");
const mongoose = require("mongoose");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Ürünler getirilirken bir hata oluştu.",
    });
  }
};

const getProductById = async (req, res) => {
  const idParam = new mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findOne({
    _id: idParam,
  });
  console.log("Product found by backend:", product);
  // if (!product) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Ürün bulunamadı.",
  //   });
  // }
  // return res.status(200).json({
  //   success: true,
  //   product,
  // });
};

const createProduct = async (req, res) => {
  try {
    const productObj = new Product({
      ...req.body,
    });

    console.log(productObj);

    const product = await productObj.save();

    return res.status(201).json({
      success: true,
      message: "Ürün oluşturuldu.",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Ürün oluşturulurken bir hata oluştu.",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Ürün bulunamadı.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Ürün silindi.",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Ürün silinirken bir hata oluştu",
    });
  }
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Ürün bulunamadı.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Ürün güncellendi.",
    product,
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
