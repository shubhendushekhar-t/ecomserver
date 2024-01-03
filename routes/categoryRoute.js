import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js'
import { createCategoryController, getCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//routes for create, get, getbyid for categories
router.post('/create-category', requireSignIn, createCategoryController)
router.get('/get-categories', requireSignIn, getCategoriesController)
router.get('/get-category/:id', requireSignIn, getCategoryByIdController)

//routes for update category
router.put('/update-category/:id', requireSignIn, updateCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignIn, deleteCategoryController)

export default router