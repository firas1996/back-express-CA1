const User = require("../models/userModel");

// exports.signUp = async (req, res) => {
//   try {
//     const { name, email, password, confirm_password, role } = req.body;
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//       confirm_password,
//       role: role === "admin" ? "user" : role,
//     });
//     res.status(201).json({
//       message: "User createdd !!!",
//       data: newUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Error",
//       error: error,
//     });
//   }
// };

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      role: req.body.role === "admin" ? "user" : req.body.role,
    });
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required !!!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Email or password are incorrect !!!!",
      });
    }
    if (!(await user.comparePassword(password, user.password))) {
      res.status(400).json({
        message: "Email or password are incorrect !!!!",
      });
    }

    res.status(201).json({
      message: "Logged in !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};
