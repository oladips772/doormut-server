/** @format */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const riderSchema = mongoose.Schema(
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
    ninNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// login
riderSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// create rider
riderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Rider = mongoose.model("Rider", riderSchema);
module.exports = Rider;
