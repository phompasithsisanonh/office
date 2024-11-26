const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    tel: {
      type: String,
      require: true,
    },
    password: {
        type: String,
        require: true,
      },
  },
  { timestamps: true }
);
module.exports = model("UsersModel", userSchema);
