const UserRegistration = require("../Models/UserRegistration");
const mongoose = require("mongoose");

async function EditProfile(emailIdLogin, profile) {
  try {
    const existingUser = await UserRegistration.findOne({
      email: emailIdLogin,
    });
    existingUser.name = profile.name;
    existingUser.phone = profile.phone;
    await existingUser.save();
  } catch (error) {
    console.error("Error editing profile:", error);
    throw error;
  }
}

async function SaveAddress(emailIdLogin, address) {
  try {
    const existingUser = await UserRegistration.findOne({
      email: emailIdLogin,
    });
    const existingAddress = existingUser.address || [];
    const isPrimary = existingUser.address.length === 0 ? 1 : 0;
    existingAddress.push({
      id: new mongoose.Types.ObjectId(),
      flatno: address.flatno,
      street: address.street,
      area: address.area,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      isPrimary: isPrimary,
    });
    existingUser.address = existingAddress;
    await existingUser.save();
  } catch (error) {
    console.error("Error saving address:", error);
    throw error;
  }
}

module.exports = {
  EditProfile,
  SaveAddress,
};