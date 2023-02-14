import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asynchandler from "express-async-handler";

const protect = asynchandler(async (req, res, next) => {
    let token;
    console.log("I am here");
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith("Bearer")
    // ) {
    try {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);
        console.log(req.user);
        if (!req.user) {
            res.redirect("/");
        }
        next();
    } catch (err) {
        console.log(err);
        res.redirect("/");

        throw new Error("invalid token");
    }

    if (!token) {
        res.redirect("/");
        throw new Error("token not found 2");
    }
});
export { protect };
