const express = require("express");
const {
  getAllPrize,
  createPrize,
  deletePrize,
  updatePrize,
  getPrize,
  getPrizedUser,
  getUserhistory,
} = require("./prizeController");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { verifyToken } = require("../../utils/jwt");
const router = express.Router();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1];
    if (!ext) {
      ext = "webm";
    }
    cb(null, `user-${uuidv4()}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

const uploadUserPhoto2 = upload.fields([{ name: "image", maxCount: 1 }]);
router.route("").post(uploadUserPhoto2, createPrize);
router.route("").get(getAllPrize);

router.route("/history/:userId").get(getUserhistory);

router.route("/PrizedUser").get(getPrizedUser);
router
  .route("/:id")
  .patch(uploadUserPhoto2, updatePrize)
  .get(getPrize)
  .delete(deletePrize)
  .get(getUserhistory);

module.exports = router;
