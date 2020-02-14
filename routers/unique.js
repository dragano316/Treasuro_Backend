const express = require("express");
const Unique = require("../models/unique.js");
const router = new express.Router();

const randomstring = require("randomstring");

router.post("/create", async (req, res) => {
  try {
    for (let i = 0; i < 1000; i++) {
      const rndm = randomstring.generate(8);
      const unique1 = new Unique({
        stringId: rndm,
        used: false
      });
      await unique1.save();
    }
    return res.send("OK");
  } catch (err) {
    return res.send("Failed");
  }
});

router.get("/extract", async (req, res) => {
  try {
    const uniqueids = await Unique.find({}, { stringId: 1, _id: 0 });
    // console.log(uniqueids)
    return res.send({ uniqueids });
  } catch (e) {
    return res.status(401).send(e);
  }
});

router.get("/", (req, res) => {
  res.send("Treasuro Working Fine");
});

module.exports = router;
