const { request } = require("http");
const Product = require("../models/productModel");
const { response } = require("../app");

//create Product -- admin
exports.createProduct = async (request, response) => {
  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
};

//get all products
exports.getAllProducts = async (request, response) => {
  const products = await Product.find();
  response.status(200).json({ success: true, products });
};

//get product details
exports.getProductDetails = async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return response.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  response.status(200).json({
    success: true,
    product,
  });
};

//update product --admin
exports.updateProduct = async (request, response, next) => {
  let product = await Product.findById(request.params.id);
  if (!product) {
    return response.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });

  response.status(200).json({
    success: true,
    product,
  });
};

//delete product

exports.deleteProduct = async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return response.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.findByIdAndDelete(request.params.id);

  response.status(200).json({
    success: true,
    message: "deleted",
  });
};
