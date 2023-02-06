const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

 
const {
  
  login,
  sendotp,
  verifyotps,
  userlogin

} = require("../controller/user");
 
 
router.post("/user/sendotp", sendotp);
router.post("/user/verifyotps", verifyotps);
  
router.post("/user/login", login);
router.post("/user/userlogin", userlogin);

 

//adminuser

 
module.exports = router;
 