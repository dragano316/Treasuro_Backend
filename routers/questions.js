const express = require("express");
const Question = require("../models/questions.js");
const User = require("../models/users.js");
const auth = require("../middleware.js");
const crypto = require("crypto");
const router = new express.Router();

router.post("/questions", async (req, res) => {
  const question = new Question(req.body);
  // await question.save()
  var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
  var mystr = mykey.update(req.body.answer, "utf8", "hex");
  mystr += mykey.final("hex");
  console.log(mystr);

  // console.log(mystr1)

  question.link = `http://jssmmil.in/questions.html?ans=${mystr}&level=${req.body.level}`;
  await question.save();
  res.send(question);
});

router.get("/getquestions", async (req, res) => {
  const user = req.query.user;
  try {
    const person = await User.findOne({ _id: user });
    const ques = await Question.findOne({ level: person.level });
    if (ques) {
      res.send({ ques, person });
    } else {
      res.status(200).send({ answer: "Completed" });
    }
  } catch (err) {
    res.status(401).send("Error");
  }
});

router.post("/level", async (req, res) => {
  const answer=req.body.answer
    const level=req.body.level
    const user_id=req.query.user
    // console.log(user_id)

    var mykey1 = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr1 = mykey1.update(answer, 'hex', 'utf8')
    mystr1+= mykey1.final('utf8');

    // console.log(mystr1)

    try{

        if(mystr1==="lucky"){
            // console.log(user_id)
            try{
            const user=await User.findOne({_id:user_id})
            // console.log(user)

            if(user.lucky<=0){
                res.send('Lucky Answers Limit Exceeded')
            }
            else{
                let prob=Math.random()
                console.log(prob)
            if(prob>0.5){
                user.lucky-=1
                user.score+=10
                await user.save()
                res.send({answer:'10',user})
            }
            else{
                user.lucky-=1
                user.score-=5
                await user.save()
                res.send({answer:'-5',user})
            }
        }
    }catch(e){
        res.send(e)
        }
    }    
        else{
    const user=await User.findOne({_id:user_id})

    const question=await Question.findOne({level:user.level})


if(user.freeze===false){

    if(mystr1===question.answer && level==question.level){
        // console.log('yes')
        user.level=user.level+1
        if(user.level===user.top+1){
            user.freeze=true
            await user.save()
            res.status(200).send({user,answer:'Won'})
        }
        const newquestion=await Question.findOne({level:user.level})
        console.log(newquestion)
        user.attempts=3//changed
        user.score+=5
        await user.save()
        res.status(200).send({user,newquestion})
    }
    else{
        user.score-=2
        user.attempts-=1//changed
        if(user.attempts===0){
            user.freeze=true
            await user.save()
            res.status(200).send({user,answer:"Maximum Limit Reached"})
        }
        await user.save()
        res.status(200).send({user,answer:"Wrong"})
    }

}
else{
    res.status(200).send({user,answer:"Maximum limit reached!! Please Purchase a new ID"})
}
        }
    
    }
    catch(e){
        res.status(404).send(e)
    }

  // const answer = req.body.answer;
  // const level = req.body.level;
  // const user_id = req.query.user;

  // var mykey1 = crypto.createDecipher("aes-128-cbc", "mypassword");
  // var mystr1 = mykey1.update(answer, "hex", "utf8");
  // mystr1 += mykey1.final("utf8");
  // console.log(mystr1);

  // try {
  //   const user = await User.findOne({ _id: user_id });

  //   const question = await Question.findOne({ level: user.level });

  //   if (user.freeze === false) {
  //     if (mystr1 === question.answer && level == question.level) {
  //       console.log("yes");
  //       user.level = user.level + 1;
  //       if (user.level === user.top + 1) {
  //         user.freeze = true;
  //         await user.save();
  //         res.status(200).send({ user, answer: "Won" });
  //       }
  //       const newquestion = await Question.findOne({ level: user.level });
  //       console.log(newquestion);
  //       user.attempts = 3; //changed
  //       user.score += 5;
  //       await user.save();
  //       res.status(200).send({ user, newquestion });
  //     } else {
  //       user.score -= 2;
  //       user.attempts -= 1; //changed
  //       if (user.attempts === 0) {
  //         user.freeze = true;
  //         await user.save();
  //         res.status(200).send({ user, answer: "Maximum Limit Reached" });
  //       }
  //       await user.save();
  //       res.status(200).send({ user, answer: "Wrong" });
  //     }
  //   } else {
  //     res
  //       .status(200)
  //       .send({
  //         user,
  //         answer: "Maximum limit reached!! Please Purchase a new ID"
  //       });
  //   }
  // } catch (e) {
  //   res.status(404).send("Error!!");
  // }

});

module.exports = router;
