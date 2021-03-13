// implement your server here
// require your posts router and connect it here
const express = require("express");
const cors = require("cors");

const PostsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", PostsRouter);

module.exports = server;
