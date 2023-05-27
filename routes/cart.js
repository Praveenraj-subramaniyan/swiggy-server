var express = require("express");
var router = express.Router();
const { CheckUser,AddCart,HomePage} = require('./DBConnection');
const{ViewCart}= require('./modifyCartData');

router.post("/", async (req, res) => {
  try {
    const { loginDataFromCookie, updatedCartData } =await req.body;
    var loginCredentials = await CheckUser(loginDataFromCookie.emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == loginDataFromCookie.passwordLogin) {
        AddCart(loginDataFromCookie.emailIdLogin,updatedCartData);
        res.status(200).send(null);
      } else {
        res.status(200).send(null);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/view", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } =await req.body;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == passwordLogin) {
        var restaurantList = await HomePage();
        res.json(ViewCart(restaurantList,loginCredentials));
      } else {
        res.status(200).send(null);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;