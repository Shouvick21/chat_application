const { app, server } = require("./socket/socket");
const axios=require("axios")
const crons=require("node-cron")
const express = require("express");
const connectMongoDb = require("./configs/database.config");
const cookieParser = require("cookie-parser");
// const app=express()
const cors = require("cors");
const { Isauthenticated } = require("./middleware/authentication");
const messageRouter = require("./routes/message.router");
const userRouter = require("./routes/user.route");
const gptRoute = require("./routes/chatGpt.route");
require("dotenv").config();
const port = process.env.PORT;
const frontend_url=process.env.FRONTEND_URL
const corsOptions = {
  origin: frontend_url,
  credentials: true,
};

app.use(cors(corsOptions));

// it is useed for cookie and compalsery to write thsi
app.use(cookieParser());
app.use(express.json());

// route for user related request like- register,login,logout,allother user
app.use("/api/v1/user", userRouter);

// route for message related request
app.use("/api/v1/message", Isauthenticated, messageRouter);

app.use("/api/v1/ai", Isauthenticated, gptRoute);



// cron jobs for always running the server


crons.schedule("* * * * *",async()=>{
  try {
    let {data}=await axios.get("https://chat-application-e4w7.onrender.com")
  console.log(data)
  } catch (error) {
    console.log(error.message)
  }
})


app.get("/", (req, res) => {
  return res.status(200).send("backend running...");
});
server.listen(port, async () => {
  await connectMongoDb();
  console.log(`http://localhost:${port}`);
});
