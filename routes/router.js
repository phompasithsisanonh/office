const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controller/auth/login_register");
const { writeedd } = require("../controller/writeedd");
const { listAll } = require("../controller/listAll");
const { deleteController } = require("../controller/deleteController");
router.post("/checkcode", writeedd);
router.post("/register", registerController);
router.post("/login", loginController);
router.get('/listAll',listAll)

router.delete('/delete/:id',deleteController)
module.exports = router;
