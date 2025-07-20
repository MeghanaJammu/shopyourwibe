const { request } = require("http");
const Product = require("../models/productModel");
const { response } = require("../app");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/features");

//create Product -- admin
exports.createProduct = catchAsyncErrors(async (request, response) => {
  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsyncErrors(async (request, response) => {
  const apiFeature = new ApiFeatures(Product.find(), request.query)
    .search()
    .filter();

  const products = await apiFeature.query;
  response.status(200).json({ success: true, products });
});

//get product details
// exports.getProductDetails = async (request, response, next) => {
//   const product = await Product.findById(request.params.id);

//   if (!product) {
//     return next(new ErrorHandler("Product Not Found", 404));
//   }

//   response.status(200).json({
//     success: true,
//     product,
//   });
// };
exports.getProductDetails = catchAsyncErrors(
  async (request, response, next) => {
    const product = await Product.findById(request.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    response.status(200).json({
      success: true,
      product,
    });
  }
);

//update product --admin
exports.updateProduct = catchAsyncErrors(async (request, response, next) => {
  let product = await Product.findById(request.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });

  response.status(200).json({
    success: true,
    product,
  });
});

//delete product

exports.deleteProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await Product.findByIdAndDelete(request.params.id);

  response.status(200).json({
    success: true,
    message: "deleted",
  });
});
