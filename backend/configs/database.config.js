const { connect } = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URL;

const connectMongoDb = async () => {
  try {
    await connect(uri);
    console.log(`atlas connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoDb;
