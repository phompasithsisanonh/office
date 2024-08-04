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
    } = req.body;

    const products = new productModel({
      user: req.user._id,
      date,
      list,
      balance,
      typeExchange,
      exchange,
      categoryExpence,
      codeNumber,
    });
    await products.save();
    res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};
module.exports.writeedd = writeedd;
