const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config()

const PORT = process.env.PORT || 4000;

const Db = require("./config/database")
Db.connectToDatabase()



app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})