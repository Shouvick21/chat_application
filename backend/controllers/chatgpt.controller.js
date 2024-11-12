const OpenAI = require("openai");
const cloudinary=require("cloudinary").v2
require("dotenv").config()
const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const generateImage = async (req, res) => {
  try {
    const { prompt } = req.query;
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      size: "512x512",
      quality: "standard",
      n: 1,
    });
    const imageUrl = response.data[0].url;
    const clounaryurl=await cloudinary.uploader.upload(imageUrl)
    return res.status(200).send(clounaryurl.secure_url);
  } catch (error) {
    //   console.log(error.message);
    return res.status(500).send("Error in generating image");
  }
};

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.query;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${prompt} ,Format:  normal text, no programing related syntax  `,
        },
      ],
    });
    // console.log(completion.choices[0].message);
    return res.status(200).send(completion.choices[0].message);
  } catch (error) {
    return res.status(500).send("Error in generating content");
  }
};

module.exports = { generateImage, generateContent };
