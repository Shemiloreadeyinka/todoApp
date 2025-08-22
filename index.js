const express = require('express')
const dotenv= require('dotenv')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config()
app.use(express.json());
const connectDB = require('./config/dbconfig');

connectDB()
const PORT= process.env.PORT || 3000;



const app= express()

app.use('/users', require("./routes/userRoute"))
app.use('/tasks', require("./routes/taskRoute"))
app.use('/categories', require("./routes/categoryRoute"))

app.listen(PORT,()=>{console.log(` server is running on ${PORT}`)})

module.exports=app