/** @format */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    accountInfo: {
      bankName: {
        type: String,
        required: false,
      },
      bankCode: {
        type: String,
        required: false,
      },
      bankAccount: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// login
vendorSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// register
vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
