var express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");

router.post("/", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      // if (loginCredentials.password == passwordLogin) {
      res.status(200).send(true);
      // } else {
      //   res.status(200).send(false);
      // }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
