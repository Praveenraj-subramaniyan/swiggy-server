const express = require("express");
var router = express.Router();
const { CheckUser, HomePage,DetailsPage} = require('./DBConnection');
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

router.post("/", async function (req, res) {
  try {
    const emailIdLogin = req.body.emailIdLogin;
    const passwordLogin = req.body.passwordLogin;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send("");
    } else {
      if (loginCredentials.password == passwordLogin) {
        var restaurantList = await HomePage();
        res.json(restaurantList);
      } else {
        res.status(200).send("");
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
      res.status(200).send("");
    } else {
      if (loginCredentials.password == passwordLogin) {
        var foodItems = await DetailsPage( new ObjectId(req.params.id))
      } else {
        res.status(200).send("");
      }
    }
    res.json(foodItems);
    await connection.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
