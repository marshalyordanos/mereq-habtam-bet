const express = require("express");
const { spinPuzzle } = require("./spinController");
const { verifyToken } = require("../../utils/jwt");

const { spinPrize } = require("./prizeSpinController");

const router = express.Router();

router.route("").post(spinPuzzle);
router.route("/prize").post(spinPrize);

module.exports = router;
