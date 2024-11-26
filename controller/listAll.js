const AddController =require('../models/AddController')

const listAll =async(req,res,next)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || Infinity;
        const skip = (page - 1) * limit;
        const products = await  AddController.find().skip(skip).limit(limit)
        const total = await  AddController.countDocuments();
        res.status(200).json({ products, total });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Errro in Registeration",
          error,
        });
      }
}
module.exports.listAll  = listAll ;