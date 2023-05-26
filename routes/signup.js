const express = require("express");
var router = express.Router();
const {CheckUser,InsertSignUpUser} = require('./DBConnection');

router.post("/", async (req, res) => {
  try {
    const { nameSignup, emailIdSignup, passwordSignup, confirmpasswordSignup } =await req.body;
    var registerCredentials = await CheckUser(emailIdSignup);
    if (registerCredentials == null) {
      try {
         await InsertSignUpUser(nameSignup,emailIdSignup,passwordSignup)
         res.status(200).send("True");
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
