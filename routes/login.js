var express = require('express');
var router = express.Router();
const { CheckUser} = require('./DBConnection');

router.post("/", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } =await req.body;
    var loginCredentials = await CheckUser(emailIdLogin);
    console.log(loginCredentials)
    console.log(passwordLogin)
    if (loginCredentials == null) {
      res.status(200).send("Invalid");
    } else {
      if (loginCredentials.password == passwordLogin) {
        res.status(200).send("True");
      } else {
        res.status(200).send("False");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
