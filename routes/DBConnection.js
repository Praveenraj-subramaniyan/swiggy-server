var express = require("express");
var router = express.Router();
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

async function CheckUser(emailIdLogin) {
  var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  var loginCredentials = await db
    .collection(process.env.UserRegistration_table)
    .findOne({ email: emailIdLogin });
  await connection.close();
  return loginCredentials;
}

async function HomePage() {
  var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  var restaurantList = await db
    .collection(process.env.FoodAppReact_table)
    .find({})
    .toArray();
  await connection.close();
  return restaurantList;
}

async function DetailsPage(id) {
  var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  const detailList = await db
    .collection(process.env.FoodAppReact_table)
    .findOne({ _id: new ObjectId(id) });
  await connection.close();
  return detailList;
}

async function InsertSignUpUser(nameSignup, emailIdSignup, passwordSignup) {
  var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  await db.collection(process.env.UserRegistration_table).insertOne({
    email: emailIdSignup,
    password: passwordSignup,
    name: nameSignup,
    cart: "",
    order: "",
  });
  await connection.close();
  return registerCredentials;
}

async function AddCart(emailIdLogin, updatedCartData) {
  var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  const existingUser = await db.collection(process.env.UserRegistration_table).findOne({ email: emailIdLogin });
  const existingCart = existingUser.cart || [];
  const { res_id, dish_id, quantity } = updatedCartData;
  let foundMatchingItem = false;
  for (const existingItem of existingCart) {
    if (existingItem.dish_id === dish_id && existingItem.res_id === res_id) {
      existingItem.res_id = res_id;
      existingItem.dish_id = dish_id;
      existingItem.quantity = quantity;
      foundMatchingItem = true;
      break;
    }
  }
  if (!foundMatchingItem) {
    existingCart.push({
      res_id : res_id,
      dish_id : dish_id,
      quantity : quantity,
    });
  }
  console.log(existingCart)
  // Update the user's cart data
  await db.collection(process.env.UserRegistration_table).updateOne(
    { email: emailIdLogin },
    { $set: { cart: existingCart } }
  );

  await connection.close();
  console.log("added");
}

module.exports = { CheckUser, HomePage, DetailsPage, InsertSignUpUser,AddCart };
