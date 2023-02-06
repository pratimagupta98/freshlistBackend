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


  exports.sendotp = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
  
    const { mobile,password } = req.body;

    const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      mobile: mobile,
      otp: defaultotp,
      password:hashPassword
    });
  
    const findexist = await User.findOne({ mobile: mobile });
    if (findexist) {
      res.status(403).json({
        status: false,
        msg: "welcome back",
        data: findexist,
      })
    }else{
    newUser.save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "otp send successfully",
          data: data.mobile,
          otp: data.otp,
          _id: data?._id,
        })
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "unsend otp",
          error: error,
        })
      })
    }
  }

  exports.verifyotps = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
    const { mobile, otp } = req.body;
    if (otp == 123456) {
      const findone = await User.findOne({ mobile: mobile });
      if (findone) {
        res.status(200).json({
          status: true,
          msg: "otp verified please register",
          mobile: mobile,
          otp: defaultotp,
          _id: findone._id
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  }


  exports.userlogin = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
    const getuser = await User.findOne({ mobile: req.body.mobile });
    if (getuser) {
      console.log("STRING", getuser)
      res.status(200).send({
        status: true,
        msg: "otp Send Successfully",
        otp: defaultotp,
        // _id: getuser._id,
        // mobile: getuser.mobile,
        // approvedstatus: getuser.approvedstatus
      })
    } else if (!getuser) {
      res.status(400).json({
        status: true,
        msg: "User doesn't Exist",
      });
    }
  };