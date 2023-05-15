const express = require("express");
var router = express.Router();
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

router.post("/", async function (req, res) {
  try {
    var connection = await client.connect();
    var db = connection.db("FoodAppReact");
    var restaurantList = await db
      .collection("RestaurantDetails")
      .find({})
      .toArray();
    const email = req.body.emailIdLogin;
    const password = req.body.passwordLogin;
    var loginCredentials = await db
      .collection(process.env.Table_name)
      .findOne({ email: email });
    if (loginCredentials == null) {
      res.status(200).send("");
    } else {
      if (loginCredentials.password == password) {
        res.json(restaurantList);
      } else {
        res.status(200).send("");
      }
    }
    await connection.close();
  } catch (error) {
    console.log(error);
  }
});
router.post("/:id", async function (req, res) {
  try {
    var connection = await client.connect();
    var db = connection.db("FoodAppReact");
    var foodItems = await db
      .collection("RestaurantDetails")
      .findOne({ _id: new ObjectId(req.params.id) });
    const email = req.body.emailIdLogin;
    const password = req.body.passwordLogin;
    var loginCredentials = await db
      .collection(process.env.Table_name)
      .findOne({ email: email });
    if (loginCredentials == null) {
      res.status(200).send("");
    } else {
      if (loginCredentials.password == password) {
        res.json(foodItems);
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
