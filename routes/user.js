const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

 
const {
  
  login,
   

} = require("../controller/user");
 
 

  
router.post("/user/login", login);
 

//adminuser

 
module.exports = router;
 