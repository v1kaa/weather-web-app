const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reqiured:true
    },
    addres:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("users",userSchema);