const express = require("express");
const Card = require("../models/Card");
const _ = require("lodash");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// Joi Schema of Card
const cardSchema = joi.object
(
    {
      
       name: joi.string().required().min(2),
       address: joi.string().required().min(2),
       description:joi.string().required().min(2),
       phone:joi.string().required().min(9).max(10),
       image:joi.string().required(),
 
    }
);


// Post Card in DB
router.post("/", auth, async (req, res) => {
  try {

    // Joi Validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Adding CardID + User_id
    let card = new Card(req.body);
    card.user_id = req.payload._id;
   
    // Saving card in DB
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send("Error in adding card " + error );
  }
});

// Get all cards of specific user
router.get("/my-cards", auth, async (req, res) => {
  try {
    const myCards = await Card.find({ user_id: req.payload._id });
    res.status(200).send(myCards);
  } catch (error) {
    res.status(400).send("Error in find Cards");
  }
});



// Get Specific card of Specific User
router.get("/:_id", auth, async (req, res) => {
  try {
    let card = await Card.findOne({
      _id: req.params._id,
      user_id: req.payload._id,
    });
    if (!card) return res.status(404).send("Card Was Not Found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update specific card of specific business
router.put("/:_id", auth, async (req, res) => 
{
  try {
        // Joi validation
        const {error} = cardSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);

        // Get and update card
        let card = await Card.findOneAndUpdate({ _id: req.params._id, user_id:req.payload._id}, req.body, {new:true});
        if (!card) return res.status(404).send("Card was not found");

        // Send updated card
        res.status(200).send(card);

  } catch (error) {
    res.status(400).send("Error in put card, " + error);
  }
});

// Delete specific card of specific business
router.delete("/:_id",auth, async (req, res) => {
  try {
        // Get and remove card
        let card = await Card.findOneAndRemove({ _id: req.params._id, user_id:req.payload._id});
        if (!card) return res.status(404).send("Card was not found");

        res.status(200).send("Card has been deleted");

  } catch (error) {
    res.status(400).send("Error in delete card, " + error);
  }
});

// Generate random number
const genCardNum = async ()=>{

    while(true)
    {
        let randomNum = _.random(1000,999999)
        let card = await Card.findOne({cardNumber: randomNum});

        if (!card)
            return randomNum;
    }
};

module.exports = router;