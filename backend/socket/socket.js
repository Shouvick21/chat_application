const { Server } = require("socket.io");
const http = require("node:http");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config()
const frontend_url=process.env.FRONTEND_URL
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [frontend_url],
  },
});

// {objectId: socketId} this will be form
const activeUserObj = {};

const getreciverSocketid = (reciverId) => {
  return activeUserObj[reciverId];
};

io.on("connection", (socket) => {
  // console.log("user connected",socket.id)

  const id = socket.handshake.query.userId;
  activeUserObj[id] = socket.id;
  // console.log("activeuser on socket=>",activeUserObj)

  io.emit("onlineusers", Object.keys(activeUserObj));

  socket.on("disconnect", () => {
    // console.log("user disconnected",id,socket.id)
    delete activeUserObj[id];
    io.emit("onlineusers", Object.keys(activeUserObj));
  });
});

module.exports = { app, io, server, getreciverSocketid };
