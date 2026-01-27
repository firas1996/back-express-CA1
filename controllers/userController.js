const User = require("../models/userModel");

exports.createUser = (req, res) => {
  try {
    const newUser = User.create(req.body);
    res.status(201).json({
      message: "User createdd !!!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};
