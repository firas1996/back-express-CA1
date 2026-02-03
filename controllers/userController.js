const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched !!!",
      nbr: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User fetched !!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User Updated !!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    if (!(await User.findById(req.params.id))) {
      res.status(203).json({
        message: "User does not exist !!!",
      });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(203).json({
      message: "User Deleted !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};
