var express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");
const { AddCart, ViewCart } = require("../Controller/cartController");
const { HomePage } = require("../Controller/homeController");

router.post("/", async (req, res) => {
  try {
    const { loginDataFromCookie, updatedCartData } = await req.body;
    var loginCredentials = await AuthenticateUser(loginDataFromCookie.emailIdLogin,loginDataFromCookie.passwordLogin);
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
      AddCart(loginDataFromCookie.emailIdLogin, updatedCartData);
      res.status(200).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

router.post("/view", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
        var restaurantList = await HomePage();
        res.json(ViewCart(restaurantList, loginCredentials));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

module.exports = router;
