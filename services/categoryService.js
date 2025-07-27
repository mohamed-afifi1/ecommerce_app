const { default: slugify } = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const catModel = require("../models/categoryModel");
const ApiError = require("../utils/apierror");
const subCategory = require("../models/subCategory");

// create
exports.newcategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const cat = await catModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: cat });
});

// get all
exports.getcategories = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allcat = await catModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: allcat.length, data: allcat, page });
});

// get specifc
exports.getcategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await catModel.findById(id);
  if (category) {
    res.status(200).json({ data: category });
  } else {
    next(new ApiError(`category not fount for this id : ${id}`, 404));
  }
});

exports.updatecategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await catModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (category) {
    res.status(200).json({ data: category });
  } else {
    next(new ApiError(`category not fount for this id : ${id}`, 404));
  }
});

exports.deletecategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await catModel.findOneAndDelete({ _id: id });
  if (category) {
    res.status(200).json({ data: category });
  } else {
    next(new ApiError(`category not fount for this id : ${id}`, 404));
  }
});

// get all subcategories
exports.getAllSubCategories = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allsubcat = await subCategory
    .find({ category: id })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ results: allsubcat.length, data: allsubcat, page });
});
