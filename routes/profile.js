var express = require("express");
var router = express.Router();
const { CheckUser} = require("./DBConnection");

router.post("/", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == passwordLogin) {
        const payload={
          email:loginCredentials.email,
          name:loginCredentials.name,
          phone:loginCredentials.phone,
          address:loginCredentials.address,
        }
        res.json(payload);
      } else {
        res.status(200).send(null);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { emailIdLogin, passwordLogin } = await req.body;
    var loginCredentials = await CheckUser(emailIdLogin);
    if (loginCredentials == null) {
      res.status(200).send(null);
    } else {
      if (loginCredentials.password == passwordLogin) {
        console.log(loginCredentials.order);
        res.json(loginCredentials.order);
      } else {
        res.status(200).send(null);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;