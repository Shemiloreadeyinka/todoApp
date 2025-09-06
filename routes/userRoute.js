const {register,login,getoneUser,getallUsers,deleteUser,updateUser,logout}= require("../controllers/userController")
const express= require("express")
const authentication= require("../middlewares/authMiddleware")
const route=express.Router()

route.post('/register',register);
route.post('/login',login);
route.get('/:id',authentication, getoneUser)
route.get('/',authentication, getallUsers)
route.delete('/:id',authentication,deleteUser)
route.patch('/:id',authentication,updateUser)
route.post('/logout',authentication,logout)

module.exports=route