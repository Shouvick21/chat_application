const conversation = require("../models/conversation.model");
const messages = require("../models/message.model");
const mongoose = require("mongoose");
const { io, getreciverSocketid } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const senderId = req._id;
    const reciverId = req.params.reciverId;
    const { message } = req.body;
    let gotConversation = await conversation.findOne({
      participents: { $all: [senderId, reciverId] },
    });
    if (!gotConversation) {
      gotConversation = new conversation({
        participents: [senderId, reciverId],
      });
    }
    const newmessage = new messages({
      senderId,
      reciverId,
      message,
    });
    gotConversation.messages.push(newmessage._id);
    await newmessage.save();
    await gotConversation.save();

    // socket.io

    const reciverSocketid = getreciverSocketid(reciverId);
    console.log(
      "in messagecontroller",
      "reciverSocketid=>",
      reciverSocketid,
      "reciverId=>",
      reciverId
    );

    if (reciverSocketid) {
      io.to(reciverSocketid).emit("newmessage", newmessage);
    }

    return res.status(201).json({
      message: newmessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req._id;
    const reciverId = req.params.reciverId;

    // console.log(senderId)
    // console.log(reciverId)
    let allmessage = await conversation.aggregate([
      {
        $match: {
          participents: {
            $all: [
              new mongoose.Types.ObjectId(senderId),
              new mongoose.Types.ObjectId(reciverId),
            ],
          },
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": 1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    // using findOne we can get this very easily===> let allmessage=await conversation.findOne({participents:{$all: [senderId,reciverId]} })
    // console.log(allmessage[0].messages)
    return res.status(200).send(allmessage[0]?.messages);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// getNotSeenMasages=async(req,res)=>{
//     try {
//         const senderId=req._id
//     const reciverId=req.params.reciverId
//     console.log(senderId,reciverId)
//     let messages=await conversation.find({participents : {$all:[senderId,reciverId]}})
//     return res.status(200).send(messages)
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }

// }
const updateConversationCount = async (req, res) => {
  try {
    const senderId = req._id;
    const reciverId = req.params.reciverId;
    const { count } = req.body;
    let data = await conversation.updateOne(
      { participents: { $all: [senderId, reciverId] } },
      { $set: { count } }
    );
    return res.status(200).json({
      message: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { sendMessage, getMessage, updateConversationCount };
