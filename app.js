const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config()
const cookie = require('cookie-parser');
app.use(cookie())

const PORT = process.env.PORT || 4000;

const Db = require("./config/database")
Db.connectToDatabase()

const router = require("./router/UserRouter");
app.use("/", router)

app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})