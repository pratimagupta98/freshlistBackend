const express = require("express");
const app = express();
const cors = require("cors");
const AWS = require("aws-sdk");
const fs = require("fs");
 


require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
 
const user = require("./routes/user")
 

 
//use
app.use("/", user);
 






app.get("/", (req, res) => {
  res.send("Hello World!");
});

 

 
 mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });
  

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000");
});

 
//    http://localhost:4000/admin
