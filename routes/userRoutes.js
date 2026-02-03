const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.patch("/updateUser/:id", updateUserById);

module.exports = router;
