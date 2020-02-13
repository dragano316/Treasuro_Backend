const express=require('express')
const Unique=require('../models/unique.js')
const router=new express.Router()

const randomstring=require("randomstring");


router.post('/create',async(req,res)=>{
    try{
    for(let i=0;i<1000;i++){
        const rndm=randomstring.generate(8);
        const unique1=new Unique({
            stringId:rndm,
            used:false
        })
        await unique1.save();
    }
    return res.send('OK')
}
catch{
    return res.send('Failed')

}

})
// async function create(){
    
// }


// create();

module.exports=router