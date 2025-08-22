const express = require('express')
const dotenv= require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()
const app= express()
app.use(express.json());
app.use(cookieParser());
const connectDB = require('./config/dbConfig');

connectDB()
const PORT= process.env.PORT || 3000;




app.use('/users', require("./routes/userRoute"))
app.use('/tasks', require("./routes/taskRoute"))
app.use('/categories', require("./routes/categoryRoute"))
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT,()=>{console.log(` server is running on ${PORT}`)})

module.exports=app