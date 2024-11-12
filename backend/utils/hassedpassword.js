const argon = require("argon2");

const createHassedPassword = async (password) => {
  let Hpassword = await argon.hash(password);
  // console.log(Hpassword)
  return Hpassword;
};

const Checkpassword = async (hassedpassword, checkpassword) => {
  let status = await argon.verify(hassedpassword, checkpassword);
  // console.log(status)
  return status;
};

module.exports = { createHassedPassword, Checkpassword };
