const { default: slugify } = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const subCategory = require("../models/subCategory");
const ApiError = require("../utils/apierror");

//create
exports.newSubCategory = expressAsyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subcat = await subCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcat });
});

// get all
exports.getSubCategories = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const allSubCat = await subCategory.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: allSubCat.length, data: allSubCat, page });
});

// get specifc
exports.getSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCat = await subCategory.findById(id);
  if (subCat) {
    res.status(200).json({ data: subCat });
  } else {
    next(new ApiError(`SubCategory not fount for this id : ${id}`, 404));
  }
});

exports.updateSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCat = await subCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (subCat) {
    res.status(200).json({ data: subCat });
  } else {
    next(new ApiError(`subCategory not fount for this id : ${id}`, 404));
  }
});

exports.deleteSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCat = await subCategory.findOneAndDelete({ _id: id });
  if (subCat) {
    res.status(200).json({ data: subCat });
  } else {
    next(new ApiError(`subCategory not fount for this id : ${id}`, 404));
  }
});
