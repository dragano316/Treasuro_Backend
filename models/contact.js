"use strict";
const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  }
  // stringId:{
  //     type:String
  // },
  // used:Boolean
});

const Contactcomment = mongoose.model("Contactcomment", Contact);

module.exports = Contactcomment;
