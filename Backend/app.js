const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const allowedOrigins = [
  "http://localhost:5173", // for local frontend
  "https://bond-wave.vercel.app", // for production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookie());
app.use(express.json());

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
