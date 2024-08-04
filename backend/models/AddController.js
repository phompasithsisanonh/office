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
      type: String,
      required: true,
    },
    typeExchange: {
      type: String,
      required: true,
    },
    exchange: {
      type: Number,
      required: true,
    },
    categoryExpence: {
      type: String, // Corrected line
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("AddController", productSchema);
