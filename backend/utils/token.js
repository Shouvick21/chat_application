const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const jwt_password = process.env.JWT_SECRET;

const generatetoken = async (id, username) => {
  let token = await jwt.sign({ _id: id, username }, jwt_password, {
    expiresIn: "1d",
  });
  // console.log(token)
  return token;
};
generatetoken(12, "shouuvick");
const verifytoken = async (token) => {
  let status = await jwt.verify(token, jwt_password);
  // console.log(status)
  return status;
};
module.exports = { generatetoken, verifytoken };
