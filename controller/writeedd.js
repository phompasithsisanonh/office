const productModel = require("../models/AddController");
const writeedd = async (req, res) => {
  try {
    const {
      date,
      list,
      balance,
      typeExchange,
      exchange,
      categoryExpence,
      codeNumber,
      country,
      note
    } = req.body;

    const products = new productModel({
      date,
      list,
      balance,
      typeExchange,
      exchange,
      categoryExpence,
      codeNumber,
      country,
      note,
      total: balance * exchange || balance * 1,
    });
    // Format the balance and total with commas for the response
    products.balance.toLocaleString();
    products.total.toLocaleString();
    await products.save();
    res.status(200).json({
      success: true,
      message: "保存成功",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "信息填写不完整",
    });
  }
};
module.exports.writeedd = writeedd;
