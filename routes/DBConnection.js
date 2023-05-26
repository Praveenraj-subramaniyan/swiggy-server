var express = require("express");
var router = express.Router();
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

async function CheckUser(emailIdLogin) {
  try {
    var connection = await client.connect();
  var db = connection.db(process.env.DB_name);
  var loginCredentials = await db
    .collection(process.env.UserRegistration_table)
    .findOne({ email: emailIdLogin });
  await connection.close();
  return loginCredentials;
  } catch (error) {
    console.error(error);
    return null;
  }
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
  var loginCredentials = await db
    .collection(process.env.FoodAppReact_table)
    .findOne({ _id:id });
  await connection.close();
  return loginCredentials;
}

  async function InsertSignUpUser(nameSignup,emailIdSignup,passwordSignup) {
    var connection = await client.connect();
    var db = connection.db(process.env.DB_name);
    await db.collection(process.env.UserRegistration_table).insertOne({
        email: emailIdSignup,
        password: passwordSignup,
        name: nameSignup,
        cart:"",
        order:"",
      });
    await connection.close();
    return registerCredentials;
  }  

module.exports = {CheckUser, HomePage,DetailsPage,InsertSignUpUser};