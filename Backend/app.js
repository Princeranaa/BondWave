const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
const cookie = require('cookie-parser');
app.use(cookie())
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
const PORT = process.env.PORT || 4000;

const Db = require("./config/database")
Db.connectToDatabase()

const AuthUser = require("./router/AuthUser");
const profilerouter = require("./router/ProfileRouter");
const requestRouter = require("./router/RequestRouter");
const userRouter = require('./router/UserRouter');


app.use("/", AuthUser)
app.use("/", profilerouter)
app.use("/", requestRouter)
app.use("/", userRouter)


app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})