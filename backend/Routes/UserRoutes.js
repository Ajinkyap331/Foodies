const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");


router.post("/get", (req, res) => {
  let message = req.body;
  message = { ...message };
  console.log(message);
  UserModel.find(message)
    .then((data) => {
      console.log("success");
      res.status(200).send({ code: "success", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

router.post("/set", (req, res) => {
  let message = req.body;
  message = { ...message };
  console.log(message);
  UserModel.create(message)
    .then((data) => {
      console.log("success");
      res.status(200).send({ code: "success", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

module.exports = router;
