"use strict";
const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required:true
    },
    link:{
        type:String
    }
})


const Question=mongoose.model('Question',UserSchema)

module.exports=Question