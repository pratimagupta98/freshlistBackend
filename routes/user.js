const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

 
const {
  
  login,
  sendotp,
  verifyotps

} = require("../controller/user");
 
 
router.post("/user/sendotp", sendotp);
router.post("/user/verifyotps", verifyotps);
  
router.post("/user/login", login);
 

//adminuser

 
module.exports = router;
 