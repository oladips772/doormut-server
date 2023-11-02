/** @format */
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const cors = require("cors");
const adminRouter = require("./routes/Admin");

app.get("/", (req, res) => res.send("doormut server... (server healthy)"));
app.use(express.json());
app.use(cors());

// ? routes
app.use("/api/v1/admins", adminRouter);

// ? connecting to db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server running on port ${PORT} && mongoDB connected..`)
    )
  )
  .catch((err) => console.log(err));
