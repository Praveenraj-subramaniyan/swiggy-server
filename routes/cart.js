var express = require("express");
var router = express.Router();
const { CheckUser,AddCart} = require('./DBConnection');

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


module.exports = router;