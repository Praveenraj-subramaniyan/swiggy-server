var express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");
const { HomePage } = require("../Controller/homeController");
const { Addorders } = require("../Controller/ordersController");
const { ViewCart } = require("../Controller/cartController");

router.post("/checkout", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
      var restaurantList = await HomePage();
      await Addorders(emailIdLogin, ViewCart(restaurantList, loginCredentials));
      res.json(true);
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
      res.json(loginCredentials.order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

module.exports = router;
