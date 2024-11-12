const express = require("express");
const {
  sendMessage,
  getMessage,
  updateConversationCount,
} = require("../controllers/message.controller");

const messageRouter = express.Router();

messageRouter.post("/send/:reciverId", sendMessage);
messageRouter.get("/getmessage/:reciverId", getMessage);
messageRouter.patch("/updateconveration/:reciverId", updateConversationCount);

module.exports = messageRouter;
