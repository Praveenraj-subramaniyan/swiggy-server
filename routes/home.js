const express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");
const { HomePage } = require("../Controller/homeController");
const { CheckCart } = require("../Controller/cartController");

router.post("/", async function (req, res) {
  const emailIdLogin = req.body.emailIdLogin;
  const passwordLogin = req.body.passwordLogin;
  try {
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
      var restaurantList = await HomePage();
      res.json(CheckCart(restaurantList, loginCredentials));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

module.exports = router;
