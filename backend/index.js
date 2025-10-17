require("dotenv").config()
const express = require("express");
const route = require("./route/user");
const server = express();
const mongo = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
mongo.connect(process.env.mongo)
.then(()=>{
    console.log("connected!");
})
.catch((e)=>{
    console.log("something went wrong " + e.message)
})
server.use(express.json());
 server.use(route)
// server.use("/",(req,res)=>{
//     res.send("hello brother");
// })

server.listen(3000,()=>{
    console.log("hello");
})