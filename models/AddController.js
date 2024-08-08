const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UsersModel",
    },
    date: {
      type: String,
      required: true,
    },
    codeNumber: {
      type: String,
      required: true,
    },
    list: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    typeExchange: {
      type: String,
      required: true,
    },
    exchange: {
      type: Number,
      default:1,
    },
    total:{
      type: Number,
    },
    categoryExpence: {
      type: String, // Corrected line
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("AddController", productSchema);
