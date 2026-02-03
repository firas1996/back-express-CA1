const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required !!!"],
  },
  email: {
    type: String,
    required: [true, "The email is required !!!"],
    unique: true,
    validate: [validator.isEmail, "The email is not valid !!!"],
    lowercase: true,
    //uppercase:true,
  },
  password: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
    validate: {
      validator: function (confPass) {
        return confPass === this.password;
      },
      message: "Password and Confirm Password does not match !!!!",
    },
  },
  role: {
    type: String,
    enum: ["user", "test", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  last_pass_date_change: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
