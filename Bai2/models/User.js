const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
       // tạo user giống thì lỗi
    },
    
    password:{
        type:String,
        
        
    },
   
},{timestamps:true})

module.exports = mongoose.model("users",userSchema)