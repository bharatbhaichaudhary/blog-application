const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(400).json({ success: false, message: "token not found" });
    }

    const user = await jwt.verify(token, process.env.JWT_SECRT);

    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = authMiddleware;
