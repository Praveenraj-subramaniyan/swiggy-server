const UserRegistration = require("../Models/UserRegistration");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MongoDb_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function CheckUser(emailIdLogin) {
  try {
    const user = await UserRegistration.findOne({ email: emailIdLogin });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function AuthenticateUser(emailIdLogin, passwordLogin) {
  try {
    const userCheck = await UserRegistration.findOne({ email: emailIdLogin });
    if (userCheck.password === passwordLogin) {
      return userCheck;
    }
    return false;
  } catch (error) {
    return false;
  }
}

module.exports = { CheckUser, AuthenticateUser };
