const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
app.use(cookie());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // frontend dev
  "https://bond-wave-xlkg.vercel.app", // production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const Db = require("./config/database");
Db.connectToDatabase();

const AuthUser = require("./router/AuthUser");
const profilerouter = require("./router/ProfileRouter");
const requestRouter = require("./router/RequestRouter");
const userRouter = require("./router/UserRouter");
const paymentRouter = require("./router/payment");
const chatRouter = require("./router/ChatRouter");

app.use("/", AuthUser);
app.use("/", profilerouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

module.exports = app;
