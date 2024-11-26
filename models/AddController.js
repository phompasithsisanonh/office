const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
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
    country:{
      type: String,
      required: true,
      enum:["泰国","老挝"]
    },
    categoryExpence: {
      type: String, // Corrected line
      required: true,
    },
    note:{
      type: String, // Corrected line
      required: true,
    }
  },
  { timestamps: true }
);
module.exports = model("AddController", productSchema);
