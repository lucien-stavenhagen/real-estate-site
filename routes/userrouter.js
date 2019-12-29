const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");

router.post("/newuser", usersController.add_user);
router.post("/login", usersController.login_user);
router.get("/getusers", usersController.get_users);
module.exports = router;
