const { default: slugify } = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModel");
const ApiError = require("../utils/apierror");

// create
exports.newBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// get all
exports.getBrands = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allBrands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: allBrands.length, data: allBrands, page });
});

// get specifc
exports.getBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await brandModel.findById(id);
  if (Brand) {
    res.status(200).json({ data: Brand });
  } else {
    next(new ApiError(`Brand not fount for this id : ${id}`, 404));
  }
});

exports.updateBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const Brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );
  if (Brand) {
    res.status(200).json({ data: Brand });
  } else {
    next(new ApiError(`Brand not fount for this id : ${id}`, 404));
  }
});

exports.deleteBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await brandModel.findOneAndDelete({ _id: id });
  if (Brand) {
    res.status(200).json({ data: Brand });
  } else {
    next(new ApiError(`Brand not fount for this id : ${id}`, 404));
  }
});
