const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({
    name:{type:String, lowercase:true,required:true ,trim:true},
    description:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
},{timestamps:true})

module.exports=mongoose.model('Category', categorySchema)