const {addCategory,getCategory,getAllCategories,deleteCategory,updateCategory}= require("../controllers/categoryController")
const express= require("express")
const authentication= require("../middlewares/authMiddleware")
const route=express.Router()

route.post('/',authentication,addCategory);
route.get('/',authentication,getAllCategories);
route.get('/:id',authentication,getCategory);
route.delete('/:id',authentication,deleteCategory);
route.patch('/:id',authentication,updateCategory);
module.exports= route