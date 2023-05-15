const express = require("express");
var router = express.Router();
var { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var client = new MongoClient(
  `mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`
);

router.post("/", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var connection = await client.connect();
    var db = connection.db(process.env.DB_name);
    var loginCredentials = await db
      .collection(process.env.Table_name)
      .findOne({ email: emailIdLogin });
    if (loginCredentials == null) {
      res.status(200).send("Invalid");
    } else {
      if (loginCredentials.password == passwordLogin) {
        res.status(200).send("True");
      } else {
        res.status(200).send("False");
      }
    }
    await connection.close();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
