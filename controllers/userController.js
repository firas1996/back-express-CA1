const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
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
