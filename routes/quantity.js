const express = require("express");
var router = express.Router();

function CheckCart(restaurantList, loginCredentials) {
  const cartItems = loginCredentials.cart;
  const modifiedRestaurantList = restaurantList.map((restaurant) => {
    if (cartItems.length > 0) {
      const dishesWithQuantity = restaurant.dishes.map((dish) => {
        const cartItem = cartItems.find((item) => item.dish_id === dish.dish_id && restaurant._id.toString() === item.res_id);
        const updatedQuantity = cartItem ? cartItem.quantity : "0";
          return { ...dish, quantity: updatedQuantity };
      });
      return { ...restaurant, dishes: dishesWithQuantity };
    } else {
      const dishesWithZeroQuantity = restaurant.dishes.map((dish) => {
        return { ...dish, quantity: "0" };
      });
      return { ...restaurant, dishes: dishesWithZeroQuantity };
    }
  });

  return modifiedRestaurantList;
}

function CheckCartDetails(foodItems, loginCredentials) {
  const cartItems = loginCredentials.cart;
    const modifiedRestaurantList = foodItems.dishes.map((dish) => {
      const cartItem = cartItems.find(
        (item) =>
          item.dish_id === dish.dish_id && item.res_id === foodItems._id.toString()
      );
      const quantity = cartItem ? cartItem.quantity : "0";
      return { ...dish, quantity };
      
    });
  return { ...foodItems, dishes: modifiedRestaurantList }
}

module.exports = { CheckCart,CheckCartDetails };

