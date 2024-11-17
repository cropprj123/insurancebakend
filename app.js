const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute");
const farmRouter = require("./routes/farmregisterRoute");
const insuranceRouter = require("./routes/insuranceregisterRoute");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev")); // Log requests

app.use(cookieparser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/farm", farmRouter);
app.use("/api/v1/insurance", insuranceRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} url`, 404)); // Added 404 status code
});

module.exports = app;
