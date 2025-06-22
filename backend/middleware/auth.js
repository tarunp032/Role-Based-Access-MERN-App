const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const secretKey = "ptarunxyzabc"; 

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = bearerToken.split(" ")[1];

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userDetail = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
