const express = require("express");
const {
  getSetting,
  createSetting,
  updateSetting,
} = require("./setttingController");
// const { protect, restricTo } = require('../auth/auth.controller');
const { verifyToken } = require("../../utils/jwt");

const router = express.Router();

router.route("").post(createSetting);

router.route("/:id").patch(updateSetting).get(getSetting);

module.exports = router;
