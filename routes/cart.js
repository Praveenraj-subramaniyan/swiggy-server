var express = require("express");
var router = express.Router();
const { CheckUser,AddCart} = require('./DBConnection');

router.post("/", async (req, res) => {
  try {
    const { loginDataFromCookie, cartData } =await req.body;
    console.log(loginDataFromCookie.passwordLogin)
    console.log(loginDataFromCookie.emailIdLogin)
    console.log(cartData)
    var loginCredentials = await CheckUser(loginDataFromCookie.emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == loginDataFromCookie.passwordLogin) {
        AddCart(loginDataFromCookie.emailIdLogin,cartData);
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


module.exports = router;