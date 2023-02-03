const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    active_group:{
      type: String,
      default: "Deactive", 
    },
    customerId: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    oldpassword:{
      type: String,
    },
    password: {
      type: String,
    },
    cnfrmPassword: {
      type: String,
    },
    type: {
      type: String,
    },
    otp: {
      type: Number,
    },
    status:{
      type:String,
      default:"false",
    },
    alt_mobile: {
      type: Number,
    },
    alt_email: {
      type: String,
    },
    group: {
      type: String,
    },
    latitude:{
      type: String,
    },
    longitude:{
      type:String,
    },
    name:{
      type: String,
    },
    city:{
      type: String,
    },
    door_number:{
      type: String,
    },
    image:{
      type: String,
    },
    captcha:{
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", customerSchema);
