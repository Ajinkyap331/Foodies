const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const MessModel = require("../Models/Mess");
const MenuModel = require("../Models/Menu");
const UserModel = require("../Models/User");

router.post("/update", (req, res) => {
  let message = req.body;
  console.log(message);
  MenuModel.create(message)
    .then((data) => {
      console.log("success");
      res.status(200).send({ code: "success", data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

router.get("/getall", (req, res) => {
  console.log("finding...");
  MessModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/updatemenu", (req, res) => {
  let message = req.body;
  console.log(message);
  UserModel.findOneAndUpdate(
    { _id: message.id, "menu._id": message._id },
    {
      $set: {
        "menu.$.name": message.name,
        "menu.$.price": message.price,
        "menu.$.available": message.available,
      },
    }
  )
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err )
      res.status(500).send(err);
    });
});

router.post("/addmenu", (req, res) => {
  let message = req.body;
  console.log(message);
  UserModel.findOneAndUpdate(
    { _id: message.id },
    {
      $push: {
        menu: {
          name: message.name,
          price: message.price,
          available: message.available,
        },
      },
    }
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/set", (req, res) => {
  let message = req.body;
  console.log(message);
  UserModel.findOneAndUpdate(
    { _id: message.id },
    {
      $set: {
        messid: uuidv4(),
        messname: message.messname,
        location: message.location,
      },
    }
  )
    .then((data) => {
      console.log("success");
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
});

module.exports = router;
