const express = require("express");
const Contactcomment = require("../models/contact.js");
const router = new express.Router();

router.post("/contact", async (req, res) => {
  // const comment=req.body.Comment
  const newcomment = new Contactcomment(req.body);
  await newcomment.save();
  res.status(201).send(newcomment);
});

module.exports = router;
