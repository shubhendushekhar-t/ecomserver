import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if(!name) {
      return res.status(401).send({
        message: "Category name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        message: "Category already exists",
      });
    }

    const newCategory = new categoryModel({ name });
    const category = await newCategory.save();
    res.status(201).send({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error creating category",
      error,
    });
  }
};

export const getCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching categories",
      error,
    });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.findByIdAndUpdate(id,{name},{new:true});
    
    res.status(200).send({ updatedCategory });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};