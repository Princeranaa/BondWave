const express = require('express');
const app = express();
const cors = require('cors');
const cookie = require('cookie-parser');
app.use(cookie())
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


const Db = require("./config/database")
Db.connectToDatabase()

const AuthUser = require("./router/AuthUser");
const profilerouter = require("./router/ProfileRouter");
const requestRouter = require("./router/RequestRouter");
const userRouter = require('./router/UserRouter');
const paymentRouter = require('./router/payment')


app.use("/", AuthUser)
app.use("/", profilerouter)
app.use("/", requestRouter)
app.use("/", userRouter)
app.use("/", paymentRouter)


module.exports = app