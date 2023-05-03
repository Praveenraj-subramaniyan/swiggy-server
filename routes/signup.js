const express = require('express');
var router = express.Router();
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

router.post("/", async (req, res) => {
  try {
    const { nameSignup, emailIdSignup, passwordSignup, confirmpasswordSignup } =await req.body;
    var connection = await client.connect();
    var db = connection.db(process.env.DB_name);
    var registerCredentials = await db.collection(process.env.Table_name).findOne({ email: emailIdSignup });
    console.log(registerCredentials);
    if (registerCredentials == null) {
      res.status(200).send("True");
      try {
        const result = await db .collection(process.env.Table_name).insertOne({
            email: emailIdSignup,
            password: passwordSignup,
            name: nameSignup,
          });
      } catch (error) {
        console.log("mongo" + error);
        res.status(200).send("Error");
      }
    } else {
      res.status(200).send("False");
    }
    await connection.close();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
