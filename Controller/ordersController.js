const UserRegistration = require("../Models/UserRegistration");
const mongoose = require("mongoose");

async function Addorders(emailIdLogin, orderList) {
  try {
    const currentDate = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const currentTime = currentDate
      .toLocaleString("en-IN", options)
      .replace(/\//g, "-")
      .replace(/, /g, " ")
      .replace(/:/g, ".");
    let orderListDetails = [];
    orderList.forEach((data) => {
      orderListDetails.push({
        res_id: data.res_id.toString(),
        dish_id: data.dish_id,
        quantity: data.quantity,
        price: data.price,
        res_name: data.res_name,
        dish_name: data.dish_name,
      });
    });
    const orders = {
      id: new mongoose.Types.ObjectId(),
      orderDate: currentTime,
      OrderDetails: orderListDetails,
    };
    console.log(orders);
    await UserRegistration.findOneAndUpdate(
      { email: emailIdLogin },
      { $set: { cart: [] }, $push: { order: orders } }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { Addorders };
