var express = require("express");
var router = express.Router();
const { AuthenticateUser } = require("../Controller/loginController");
const { EditProfile, SaveAddress } = require("../Controller/profileController");

router.post("/", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await AuthenticateUser(emailIdLogin, passwordLogin);
    if (loginCredentials === false) {
      res.status(200).send(null);
    } else {
      const payload = {
        email: loginCredentials.email,
        name: loginCredentials.name,
        phone: loginCredentials.phone,
        address: loginCredentials.address,
      };
      res.json(payload);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { loginDataFromCookie, profile } = await req.body;
    var loginCredentials = await AuthenticateUser(
      loginDataFromCookie.emailIdLogin,
      loginDataFromCookie.passwordLogin
    );
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
      await EditProfile(loginDataFromCookie.emailIdLogin, profile);
      res.json(loginCredentials.order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

router.post("/address/save", async (req, res) => {
  try {
    const { loginDataFromCookie, address } = await req.body;
    var loginCredentials = await AuthenticateUser(
      loginDataFromCookie.emailIdLogin,
      loginDataFromCookie.passwordLogin
    );
    if (loginCredentials === false) {
      res.status(400).send("login");
    } else {
        await SaveAddress(loginDataFromCookie.emailIdLogin, address);
        res.json(loginCredentials.order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("login");
  }
});

module.exports = router;
