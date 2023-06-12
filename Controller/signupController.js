const UserRegistration = require("../Models/UserRegistration");
const mongoose = require("mongoose");

async function InsertSignUpUser(
  nameSignup,
  emailIdSignup,
  passwordSignup,
  phoneSignup
) {
  const newUser = new UserRegistration({
    name: nameSignup,
    email: emailIdSignup,
    password: passwordSignup,
    phone: phoneSignup,
    cart: [],
    order: [],
    address: [],
  });
  await newUser.save();
}

module.exports = { InsertSignUpUser };
