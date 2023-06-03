const express = require("express");
var router = express.Router();
const {CheckUser,InsertSignUpUser} = require('./DBConnection');

router.post("/", async (req, res) => {
  try {
    const { nameSignup, emailIdSignup,phoneSignup, passwordSignup, confirmpasswordSignup } =await req.body;
    var registerCredentials = await CheckUser(emailIdSignup);
    if (registerCredentials == null) {
      try {
         await InsertSignUpUser(nameSignup,emailIdSignup,passwordSignup,phoneSignup)
         console.log("t")
         res.status(200).send("True");
      } catch (error) {
        console.log("mongo" + error);
        console.log("e")
        res.status(200).send("Error");
      }
    } else {
      res.status(200).send("False");
      console.log("f")
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
