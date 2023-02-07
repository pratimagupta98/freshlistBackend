const User = require("../models/user");
const resp = require("../helpers/apiResponse");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Console } = require("console");
 const saltRounds = 10;
const key = "verysecretkey";

exports.userlogin = async (req, res) => {
    const {  mobile, password,email } = req.body;
   
    const user = await User.findOne({$or:[{mobile:mobile},{email:email}]
   
    });
    console.log("USER",user)
if(user){

  if (user.status == "true") {
        
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      res.status(200).send({
        status: true,
        msg: "success",
        user: user,
      });
    } else {
      res.status(404).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  }  
  else{
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }

}else {
    res.status(404).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
    
  };


  exports.sendotp = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
  
    const { mobile } = req.body;

    // const salt = await bcrypt.genSalt(10);
    //     const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      mobile: mobile,
      otp: defaultotp,
      //password:hashPassword
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
          msg: "error",
          error: error,
        })
      })
    }
  }

  exports.verifyotps = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
    const { mobile, otp } = req.body;
     
      const findone = await User.findOne({ mobile: mobile });
      if (findone) {
        if (otp == "123456"){
          res.status(200).json({
              status: true,
              msg: "otp verified",
              mobile: mobile,
              otp: defaultotp,
              _id: findone._id
            });
        }else{
          res.status(400).json({
            status: false,
            msg: "Incorrect Otp",
          });
        }
      }else{
        res.status(404).json({
          status: false,
          error: "Something went wrong",
        });
      }
    } 
    

  
  exports.edituser = async (req, res) => {
    await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.add_details = async (req, res) => {
    const {username,email,password,cnfrmPassword} = req.body

    const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body,status:"true",password:hashPassword,cnfrmPassword:hashPassword },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


 exports.login = async (req, res) => {
    const {  mobile, password,email } = req.body;
    const user = await User.findOne( {   
      $and: [
        { $or: [{ mobile: mobile }, { email: email }] }
      ]
    });
    if (user.status == "true") {
        
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
  

 