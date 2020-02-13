const mongoose=require('mongoose')

const UniqueSchema=new mongoose.Schema({
    stringId:{
        type:String,
        required:true
    },
    used:{
        type:Boolean
    }
})


const Unique=mongoose.model('Unique',UniqueSchema)

module.exports=Unique