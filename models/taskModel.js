const mongoose = require('mongoose')

const taskSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref: "user" },
    name : { type: String, required: true },
    description : { type: String},
    category:{type: mongoose.Schema.Types.ObjectId, ref:'Category'},
    deadline:{type:Date},
    isImportant:{type:Boolean,default:false },
    completed:{type:Boolean , default:false }
    
},{ timestamps: true })

module.exports= mongoose.model('Task', taskSchema)