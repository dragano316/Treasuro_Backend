const express = require("express");
const User = require("../models/users.js");
const auth = require("../middleware.js");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const user1 = await User.verifysignupid(
      req.body.SignupID,
      req.body.UserName
    );
    await user.save();
    const token = await user.generateAuthToken();
    // console.log(token);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.getAuthentication(
      req.body.SignupID,
      req.body.Password
    );
    if (user.freeze === true) {
      res.status(200).send({ ans: "Freeze" });
    }
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

// router.post('/users/logout',async(req,res)=>{
//     try{
//         req.user.tokens=req.user.tokens.filter((token)=>{
//             return token.token!==req.token
//         })
//         await req.user.save()
//         res.send('loggedout')
//     }catch(e){
//         res.status(405).send('errorrrrrrr')
//     }
// })

router.get("/leaderboard", async (req, res) => {
  try {
    // const user=await User.find({},null,{limit:10,skip:parseInt(req.query.skip)}).sort({score:-1})
    const user = await User.find({}).sort({ score: -1 });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});
router.get("/finduser", async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.body.UserName });
    if (user) res.send({ user });
    else {
      res.send("user does not exist");
    }
  } catch (e) {
    res.send("unable to find");
  }
});

module.exports = router;
