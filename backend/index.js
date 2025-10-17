require("dotenv").config();
const express = require("express");
const route = require("./route/user");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

server.use(cookieParser());
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
server.use(express.json());

mongoose.connect(process.env.mongo)
.then(() => {
  console.log("connected!");
})
.catch((e) => {
  console.log("something went wrong " + e.message);
});

server.use(route);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("hello");
});
