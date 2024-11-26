const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const UserModel = require("../models/UserModel");
const {
  registerController,
  loginController,
} = require("../controller/auth/login_register");
const { writeedd } = require("../controller/writeedd");
const { listAll } = require("../controller/listAll");
const { deleteController } = require("../controller/deleteController");
const AuthTicat = async (req, res, next) => {
  try {

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(token, "ab231");
    const currentUser = await UserModel.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal 500",
    });
  }
};
router.post("/checkcode", writeedd);
router.post("/register", registerController);
router.post("/login", loginController);
router.get('/listAll',listAll)

router.delete('/delete/:id',deleteController)
module.exports = router;
