const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@db.dbu2ctn.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (e) => console.log(`Error : ${e}`));

const app = express();
app.use(express.json());
app.use(cors());

const MessAPI = require("./Routes/MessRoutes");
const UserAPI = require("./Routes/UserRoutes")
app.use("/api/mess", MessAPI);
app.use("/api/user", UserAPI);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Secure server listening on ${port}`);
});
