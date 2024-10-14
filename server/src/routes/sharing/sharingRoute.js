const express = require("express");
const { sharePuzzle } = require("./sharingController");
const { verifyToken } = require("../../utils/jwt");

const router = express.Router();

router.route("").post(sharePuzzle);

module.exports = router;
