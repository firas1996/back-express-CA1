const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.patch("/updateUser/:id", updateUserById);
router.delete("/deleteUser/:id", deleteUserById);

module.exports = router;
