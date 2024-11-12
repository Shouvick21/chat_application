const express = require("express");
const {
  CreateUser,
  login,
  logout,
  getOtheruser,
  serchUser,
  serchUserByid,
} = require("../controllers/user.controller");
const { Isauthenticated } = require("../middleware/authentication");

const userRouter = express.Router();

//create new user route
userRouter.post("/register", CreateUser);

//login a user route
userRouter.post("/login", login);

//logout a user route
userRouter.get("/logout", logout);

// it will return all user data except logged in user in array form and in each single object password will not be present (for security)
userRouter.get("/", Isauthenticated, getOtheruser);

userRouter.get("/search", Isauthenticated, serchUser);

userRouter.get("/serchByid/:id", serchUserByid);

module.exports = userRouter;
