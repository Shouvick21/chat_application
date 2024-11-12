const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participents: [
      // it is array of string that holds sender id and reciver id
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [
      // it is array of string it holds objectid of messages that send between 2 users
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
    count: Number,
  },
  {
    timestamps: true,
  }
);

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = conversation;
