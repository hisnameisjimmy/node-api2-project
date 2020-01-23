const express = require("express");
const postsRouter = require("./posts/posts-router.js");
const commentsRouter = require("./comments/comments-router.js");
const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);
server.use("/api/comments", commentsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Aw yiss</h>
      <p>Posts and Comments</p>
    `);
});

module.exports = server;