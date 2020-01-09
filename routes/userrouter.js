const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");
const { verifyUser } = require("../middleware/auth/verifyUser");
router.post("/newuser", usersController.add_user);
router.post("/login", usersController.login_user);
router.get("/getusers", usersController.get_users);
router.delete("/deleteuser/:id", verifyUser, usersController.delete_user);
module.exports = router;
