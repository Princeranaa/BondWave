require("dotenv").config()
const app = require("../Backend/app")
const http = require("http")
const server = http.createServer(app)
const PORT = process.env.PORT || 4000;

const initializeScoket = require("../Backend/utils/socket")
initializeScoket(server)





server.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`);
})