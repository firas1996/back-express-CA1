const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id, name) => {
  return jwt.sign({ id, name, test: "Hello !" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

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

    const token = createToken(user._id, user.name);

    res.status(201).json({
      message: "Logged in !!!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech t'thabat ken el user 3andou token or not
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        message: "You are not logged in !!!!",
      });
    }

    // 2) thabat fel validité mta3 el token

    const validToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET,
    );
    console.log(validToken.iat);
    // 3) chouf si el user moula el token mizel mawjoud wala tfasa5

    const user = await User.findById(validToken.id);
    if (!user) {
      res.status(404).json({
        message: "User not found !!!!",
      });
    }
    console.log(parseInt(user.last_pass_date_change.getTime() / 1000));

    // 4) bech nthabtou ken el token tsan3et 9bal last pass change
    if (
      validToken.iat < parseInt(user.last_pass_date_change.getTime() / 1000)
    ) {
      res.status(404).json({
        message: "Token no longer valid !!!!",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};
