const express = require('express');
var router = express.Router();
var {MongoClient, ObjectId}= require('mongodb');
const dotenv=require('dotenv');
dotenv.config();
var client= new MongoClient(`mongodb+srv://${process.env.MongoDb}@cluster0.dfyktwl.mongodb.net/?retryWrites=true&w=majority`);

router.get('/',async function(req, res) {
    try {
        var connection= await client.connect();
        var db = connection.db("FoodAppReact");
        var restaurantList = await db.collection("RestaurantDetails").find({}).toArray();
        res.json(restaurantList);
        await connection.close();
    } 
    catch (error) 
    {
     console.log(error)   
    }
});
router.get('/:id',async function(req, res) {
    try {
        var connection= await client.connect();
        var db =  connection.db("FoodAppReact");
        var foodItems = await db.collection("RestaurantDetails").findOne({_id:new ObjectId(req.params.id)});
        res.json(foodItems);
        await connection.close();
    } 
    catch (error)
    {
     console.log(error)   
    }
});
module.exports = router;
