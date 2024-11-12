const user = require("../models/user.model");

const {
  createHassedPassword,
  Checkpassword,
} = require("../utils/hassedpassword");
const profilePic = require("../utils/profilepic");
const { generatetoken } = require("../utils/token");

const CreateUser = async (req, res) => {
  const { fullname, username, password, gender, confirmpassword } = req.body;
  try {
    if (!fullname || !username || !password || !gender) {
      return res.status(400).json({
        message: "All fields need to be fill",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "password and confirm password not matched",
      });
    }
    const userdata = await user.findOne({ username });
    // console.log(userdata)
    if (userdata) {
      return res.status(400).json({
        message: "username already exist",
      });
    }
    const hassedpassword = await createHassedPassword(password);
    let newuser = new user({
      fullname,
      username,
      password: hassedpassword,
      profilePhoto: profilePic(gender, username),
      gender,
    });
    // console.log(newuser)
    await newuser.save();
    return res.status(201).json({
      message: "sucessfully registered",
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "all fields needs to be fields",
      });
    }
    const userdata = await user.findOne({ username });
    if (!userdata) {
      return res.status(400).json({
        message: "plese Register First",
        sucess: false,
      });
    }
    let passwordMAtch = Checkpassword(userdata.password, password);
    if (!passwordMAtch) {
      return res.status(400).json({
        message: "Password is not correct",
        sucess: false,
      });
    }
    const token = await generatetoken(userdata._id, username);
    return res
      .status(200)
      .cookie("accesstoken", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        _id: userdata._id,
        username: userdata.username,
        fullname: userdata.fullname,
        profilePhoto: userdata.profilePhoto,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("accesstoken", "", { maxAge: 0, sameSite: "None", secure: true })
      .json({
        message: "sucessfully Logged out  ",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getOtheruser = async (req, res) => {
  const LoggerUserId = req._id;
  try {
    if (!LoggerUserId) {
      return res.status(400).json({
        message: "user not authenticated by token",
      });
    }
    const otherUserdata = await user
      .find({ _id: { $ne: LoggerUserId } })
      .select("-password");
    // console.log(otherUserdata)
    return res.status(200).send(otherUserdata);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const serchUser = async (req, res) => {
  const { name } = req.query;
  const LoggerUserId = req._id;
  try {
    const query = { fullname: RegExp(name, "i") };
    query._id = { $ne: LoggerUserId };
    const userdetail = await user.find(query);
    return res.status(200).send(userdetail);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const serchUserByid = async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: id };
    const userdetail = await user.find(query);
    return res.status(200).send(userdetail);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateUser,
  login,
  logout,
  getOtheruser,
  serchUser,
  serchUserByid,
};
