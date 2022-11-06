const mongoose = require("mongoose")

const cardsSchema = new mongoose.Schema (
    {

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
        name:{
            type:String,
            required:true,
            minlenght:2
        },
        description:{
            type:String,
            required:true,
            minlenght:2
        },
        address:{
            type:String,
            required:true,
            minlenght:2
        },
        phone:{
            type:String,
            required:true,
            minlenght:9,
            maxlenght:10
        },
        image:{
            type:String,
            required:true,
        },

          
          


    }
)

const Card = mongoose.model("cards",cardsSchema);
module.exports = Card;