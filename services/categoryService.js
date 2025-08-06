const { default: slugify } = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const catModel = require("../models/categoryModel");
const ApiError = require("../utils/apierror");

// create
exports.newCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const cat = await catModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: cat });
});

// get all
exports.getCategories = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allcat = await catModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: allcat.length, data: allcat, page });
});

// get specifc
exports.getCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Category = await catModel.findById(id);
  if (Category) {
    res.status(200).json({ data: Category });
  } else {
    next(new ApiError(`Category not fount for this id : ${id}`, 404));
  }
});

exports.updateCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const Category = await catModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );
  if (Category) {
    res.status(200).json({ data: Category });
  } else {
    next(new ApiError(`Category not fount for this id : ${id}`, 404));
  }
});

exports.deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Category = await catModel.findOneAndDelete({ _id: id });
  if (Category) {
    res.status(200).json({ data: Category });
  } else {
    next(new ApiError(`Category not fount for this id : ${id}`, 404));
  }
});
