/** @format */
const express = require("express");
const {
  getAllAdmins,
  createAdmin,
  suspendAdmin,
  unSuspendAdmin,
} = require("../controllers/Admin");
const adminRouter = express.Router();

// ? get all admins
adminRouter.get("/", getAllAdmins);

// ? create admin
adminRouter.post("/create", createAdmin);

// ? suspend admin
adminRouter.put("/suspend/:id", suspendAdmin);

// ? unsuspend admin
adminRouter.put("/unsuspend/:id", unSuspendAdmin);


module.exports = adminRouter;
