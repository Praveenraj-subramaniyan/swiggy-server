var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const { HomePage } = require("../Controller/homeController");
const { Addorders } = require("../Controller/ordersController");
const { ViewCart } = require("../Controller/cartController");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.Stripe_Key);

router.post("/checkout", async (req, res) => {
  try {
    const auth_token = req.headers.authorization.split(' ')[1];
    const {token} = await req.body;
    console.log(token.email)
    console.log(token)
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("login");
    } else {
      try{
        var restaurantList = await HomePage();
        await stripe.customers.create({
          email: token.email
        })
        .then(customer => console.log(customer.id))
        .catch(error => console.error(error));

        await Addorders(loginCredentials.email, ViewCart(restaurantList, loginCredentials))
        res.status(200).json(true);
      }
      catch(error){
        res.status(400).json(false);
      }
     
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
}); 

router.get("/view", async (req, res) => {
  try {
    const auth_token = req.headers.authorization.split(' ')[1];
    var loginCredentials = await AuthorizeUser(auth_token);
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
