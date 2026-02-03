const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);

module.exports = router;
