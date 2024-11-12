const { verifytoken } = require("../utils/token");

const Isauthenticated = async (req, res, next) => {
  try {
    // after login cookie is saved in headers and in here tht is accessed
    let accessToken = req.cookies.accesstoken;
    // console.log(accessToken)
    if (!accessToken)
      return res.status(401).json({
        message: "token not present",
      });
    let tokendata = await verifytoken(accessToken);
    if (!tokendata)
      return res.status(401).json({
        message: "Invalid Token",
      });
    req._id = tokendata._id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { Isauthenticated };
