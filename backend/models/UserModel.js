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
userSchema.virtual("AddController", {
  ref: "AddController",
  localField: "_id",
  foreignField: "user",
});
module.exports = model("UsersModel", userSchema);
