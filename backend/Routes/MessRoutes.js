const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const MessModel = require("../Models/Mess");

router.post("/get", (req, res) => {
  let message = req.body;
  console.log(message);
  CompleteOrder.findOne({ orderID: message.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else if (data == null) {
      res.status(204).send("NO SUCH ORDER PRESENT");
    } else res.status(200).send(data);
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

router.post("/set", (req, res) => {
  let message = req.body;
  message = { ...message, id: uuidv4() };
  console.log(message);
  MessModel.create(message)
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
