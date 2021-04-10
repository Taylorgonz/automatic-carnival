const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv');

const PORT = process.env.PORT || 3000;

const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://taylorgonz-admin:vCyowWOt2NlG58Hh@cluster0.djs8r.mongodb.net/cluster0?retryWrites=true&w=majority", { useNewUrlParser: true });

app.post("/submit", ({ body }, res) => {
  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
