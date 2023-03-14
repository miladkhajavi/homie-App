const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ForgetPasswordSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  token: {
    type: String,
    trim: true,
    required: true
  }

}, {
  timestamps: true
});


const ForgetPassword = mongoose.model("ForgetPassword", ForgetPasswordSchema);

module.exports = ForgetPassword;