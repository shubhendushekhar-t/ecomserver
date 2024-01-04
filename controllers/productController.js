import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, countInStock, imageUrl, category } = req.body;
    if(!name ||!description ||!price ||!countInStock ||!imageUrl ||!category) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      category: category,
    });
    const product = await newProduct.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching products",
      error,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    res.status(200).send({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error fetching product",
      error,
    });
  }
};

export default deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.status(200).send({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, countInStock, imageUrl, category } = req.body;
    if(!name ||!description ||!price ||!countInStock ||!imageUrl ||!category) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      countInStock,
      imageUrl,
      category,
    }, { new: true });
    await product.save();
    res.status(200).send({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
      res.status(400).send({
        message: "Error updating product",
        error,
      });
  }
};