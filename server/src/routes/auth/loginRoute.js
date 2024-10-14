const express = require("express");
const { loginOrRegister, login, addPassword } = require("./loginController");

const router = express.Router();

router.route("").post(loginOrRegister);
router.route("/login").post(login);
router.route("/signup").post(addPassword);

module.exports = router;
