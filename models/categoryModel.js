const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({
    name:{type:String, lowercase:true,required:true ,trim:true},
    description:{type:String}
},{timestamps:true})

module.exports=mongoose.model('Category', categorySchema)