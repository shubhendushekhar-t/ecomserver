import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, createProductController);
router.get("/products", getAllProductsController);
router.get("/products/:id", getProductByIdController);
router.put('/update/:id', requireSignIn, isAdmin, updateProductController);
router.delete('/delete/:id', requireSignIn, isAdmin, deleteProductController);


export default router;