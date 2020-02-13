// const ob={
//     name:"divyank",
//     age:856
// }
// var x=JSON.stringify(ob)
// console.log(x)
// var y=JSON.parse(x)
// console.log(y)
// const request=require('request')
const express=require('express')
require('./mongoose.js')
const userrouter=require('./routers/users.js')
const contactrouter=require('./routers/contact.js')
const questionrouter=require('./routers/questions.js')
const uniquerouter=require('./routers/unique.js')
const cors = require('cors');
const bodyParser = require('body-parser');


const app=express()

// const port=3000
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(userrouter)
app.use(questionrouter)
app.use(contactrouter)
app.use(uniquerouter)



// app.get('',(req,res)=>{
//     res.send({
//         FirstName:"divyank",
//         LastName:"Mishra",
//         Email:"divyankmishra@gmail.com",
//         password:"85",
//     })
// })
// app.get('/weather',(req,res)=>{
//     res.send("Ypu provided"+req.query.address+'as the address')
// })
app.listen(3000,()=>{
    console.log('Server up and running in 3000')
})