const express = require("express");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.js");

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/all", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
