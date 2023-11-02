/** @format */
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");

// ? get all admins
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.status(200).json(admins);
});

// ? create admin
const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password, role } = req.body;
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    return res.status(400).json({ error: "admin exists with email provided" });
  }
  await Admin.create({ name, email, phoneNumber, password, role });
  res.status(200).send("admin created successfully");
});

// ?

module.exports = { getAllAdmins, createAdmin };
