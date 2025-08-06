const { default: slugify } = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const ApiError = require("../utils/apierror");

// get all
exports.getProducts = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allproducts = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res
    .status(200)
    .json({ results: allproducts.length, data: allproducts, page });
});

// get specifc
exports.getProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name" });
  if (Product) {
    res.status(200).json({ data: Product });
  } else {
    next(new ApiError(`Product not fount for this id : ${id}`, 404));
  }
});

exports.deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await productModel.findOneAndDelete({ _id: id });
  if (Product) {
    res.status(200).json({ data: Product });
  } else {
    next(new ApiError(`Product not fount for this id : ${id}`, 404));
  }
});

exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const Product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (Product) {
    res.status(200).json({ data: Product });
  } else {
    next(new ApiError(`Product not fount for this id : ${id}`, 404));
  }
});

// create
exports.newProduct = expressAsyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});
