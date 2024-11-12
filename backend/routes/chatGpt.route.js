const express = require("express");
const {
  generateImage,
  generateContent,
} = require("../controllers/chatgpt.controller");
const gptRoute = express.Router();

gptRoute.get("/image", generateImage);
gptRoute.get("/content", generateContent);

module.exports = gptRoute;
