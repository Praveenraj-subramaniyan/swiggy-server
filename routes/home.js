const express = require("express");
var router = express.Router();
const { CheckUser, HomePage,DetailsPage} = require('./DBConnection');
const { CheckCart} = require('./cartdatabase');

router.post("/", async function (req, res) {
  try {
    const emailIdLogin = req.body.emailIdLogin;
    const passwordLogin = req.body.passwordLogin;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == passwordLogin) {
        var restaurantList = await HomePage();
        res.json(CheckCart(restaurantList,loginCredentials));
      } else {
        res.status(200).send(null);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/:id", async function (req, res) {
  try {
    const emailIdLogin = req.body.emailIdLogin;
    const passwordLogin = req.body.passwordLogin;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == passwordLogin) {
        const foodItems = await DetailsPage(req.params.id)
        res.json(foodItems);
      } else {
        res.status(200).send(null);
      }
    }
    await connection.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
