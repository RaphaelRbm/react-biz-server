const mongoose = require("mongoose")

const userSchema = new mongoose.Schema (
    {
        name:{
            type:String,
            required:true,
            minlenght:2
        },
        email:{
            type:String,
            required:true,
            minlenght:6,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlenght:8,
        },
        isBiz:{
            type:Boolean,
            required:true,
        },
    }
)

const User = mongoose.model("users",userSchema);
module.exports = User;