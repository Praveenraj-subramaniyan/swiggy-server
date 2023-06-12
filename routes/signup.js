const express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const { CheckUser} = require('../Controller/loginController');
const { InsertSignUpUser } = require("../Controller/signupController");

router.post("/", async (req, res) => {
  try {
    const {
      nameSignup,
      emailIdSignup,
      phoneSignup,
      passwordSignup,
      confirmpasswordSignup,
    } = await req.body;
    var registerCredentials = await CheckUser(emailIdSignup);
    if (registerCredentials === false) {
      await InsertSignUpUser(
        nameSignup,
        emailIdSignup,
        passwordSignup,
        phoneSignup
      );
      res.status(200).send(true);
    } else if(registerCredentials === true) {
      res.status(200).send(false);
    }
  } catch (error) {
    console.log("catch");
    console.log(error);
    res.status(400).send("error");
  }
});

module.exports = router;
