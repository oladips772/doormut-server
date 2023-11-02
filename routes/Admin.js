/** @format */
const express = require("express");
const { getAllAdmins, createAdmin } = require("../controllers/Admin");
const adminRouter = express.Router();

// ? get all admins
adminRouter.get("/", getAllAdmins);

// ? create admin
adminRouter.post("/create", createAdmin);

module.exports = adminRouter;
