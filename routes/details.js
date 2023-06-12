const express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");
const { DetailsPage } = require("../Controller/detailsController");
const { CheckCartDetails } = require("../Controller/cartController");

router.post("/:id", async function (req, res) {
  try {
    const emailIdLogin = req.body.emailIdLogin;
    const passwordLogin = req.body.passwordLogin;
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
      const foodItems = await DetailsPage(req.params.id);
      res.json(CheckCartDetails(foodItems, loginCredentials));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

module.exports = router;
