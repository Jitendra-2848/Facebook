const jwt = require("jsonwebtoken");
const model = require("../model/user");

const verify = async (req, res, next) => {
    try {
        // console.log(req.cookies)
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token missing" });
        }

        const decoded = jwt.verify(token, process.env.Secret_key);
        const user = await model.findById(decoded.userId).select("-pass");

        if (!user) {
            return res.status(404).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        // console.log("Verified token:", token);
        next();
    } catch (error) {
        console.error("Authorization error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = verify;
