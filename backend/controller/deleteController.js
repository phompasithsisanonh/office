const addController = require("../models/AddController");
const deleteController = async (req, res, next) => {
  const { id } = req.params;

  try {
     await addController.findOneAndDelete(id);

    res.status(200).json({ message: "删除成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.deleteController= deleteController ;
