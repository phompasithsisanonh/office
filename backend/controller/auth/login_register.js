const JWT = require("jsonwebtoken");
const UsersModel = require("../../models/UserModel");
const { compare1, hashPassword } = require("../../hashPassword/hash");
const registerController = async (req, res) => {
  try {
    const { tel, password } = req.body;
    if (!tel) {
      return res
        .status(404)
        .json({ success: false, message: "tel is Required" });
    }
    if (!password) {
      return res
        .status(404)
        .json({ success: false, message: "Password is Required" });
    }
    const exisitingUser = await UsersModel.findOne({ tel });
    //exisiting user
    if (exisitingUser) {
      return res.status(404).json({
        success: false,
        message: "Already Register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new UsersModel({
      tel,
      password: hashedPassword,
    }).save();
    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};
const loginController = async (req, res, next) => {
  try {
    const { tel, password } = req.body;
    if (!tel || !password) {
      return res.status(404).json({
        success: false,
        message: "电话号码 与 密码不匹配",
      });
    }
    const user = await UsersModel.findOne({ tel });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "电话号码已经被注册了",
      });
    }
    const match = await compare1(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "密码不对",
      });
    }
    const token = await JWT.sign({ _id: user._id }, "ab231", {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "登陆成功",
      user: {
        _id: user._id,
        tel: user.tel,
        password: user.password,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "无措登录",
      err,
    });
  }
};
module.exports.registerController = registerController;
module.exports.loginController = loginController;
