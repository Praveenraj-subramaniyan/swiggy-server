const express = require("express");
var router = express.Router();
const {CheckSignUpUser,InsertSignUpUser} = require('./DBConnection');

router.post("/", async (req, res) => {
  try {
    const { nameSignup, emailIdSignup, passwordSignup, confirmpasswordSignup } =await req.body;
    var registerCredentials = await CheckSignUpUser(emailIdSignup);
    if (registerCredentials == null) {
      res.status(200).send("True");
      try {
         await InsertSignUpUser(nameSignup,emailIdSignup,passwordSignup)
      } catch (error) {
        console.log("mongo" + error);
        res.status(200).send("Error");
      }
    } else {
      res.status(200).send("False");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
