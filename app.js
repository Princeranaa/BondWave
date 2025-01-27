const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config()
const cookie = require('cookie-parser');
app.use(cookie())

const PORT = process.env.PORT || 4000;

const Db = require("./config/database")
Db.connectToDatabase()

const AuthUser = require("./router/AuthUser");
const profilerouter = require("./router/ProfileRouter");
const requestRouter = require("./router/RequestRouter");


app.use("/", AuthUser)
app.use("/", profilerouter)
app.use("/", requestRouter)



app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})