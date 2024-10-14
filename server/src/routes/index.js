const express = require("express");
const puzzleRouter = require("./puzzle/puzzleRouter");
// const userRouter = require('./user/userRoute');
const prizeRouter = require("./prize/prizeRouter");
const spinRouter = require("./spin/spinRoute");
const settingRouter = require("./setting/settingRoute");
const sharingRouter = require("./sharing/sharingRoute");
const authRouter = require("./auth/loginRoute");
const userRoute = require("./user/userRoute");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/puzzle",
    route: puzzleRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/prize",
    route: prizeRouter,
  },
  {
    path: "/spin",
    route: spinRouter,
  },
  {
    path: "/setting",
    route: settingRouter,
  },
  {
    path: "/sharing",
    route: sharingRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
