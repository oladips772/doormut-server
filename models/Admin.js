/** @format */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

// login
adminSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// register
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

