require("dotenv").config();
const express = require("express");
const route = require("./route/user");
const mongo = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

server.use(cookieParser());
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
server.use(express.json());

mongo.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected..."))
    .catch((e) => console.error("Mongo error:", e));


server.use(route);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("hello");
});
