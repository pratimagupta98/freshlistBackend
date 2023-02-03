const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 const saltRounds = 10;
const key = "verysecretkey";

exports.login = async (req, res) => {
    const {  mobile, password,email } = req.body;
    const user = await User.findOne( {   
      $and: [
        { $or: [{ mobile: mobile }, { email: email }] }, { $or: [{status:"true" }] }
      ]
    });
    if (user) {
        
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        res.status(200).send({
          status: true,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exist",
        error: "error",
      });
    }
  };