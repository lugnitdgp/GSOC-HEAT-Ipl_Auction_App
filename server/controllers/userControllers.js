import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../util/generateToken.js";

const getUser = asyncHandler(async (req, res) => {
    //console.log("id is ", req.params.id);
    let user = await User.findById(req.params.id);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("user not found");
    }
});
const updateUserMoney = async (userId, price) => {
    let user = await User.findById(userId);
    if (user) {
        await User.findByIdAndUpdate(userId, { money: user.currentMoney});
    }
};

//for creating a new user
const createUser = asyncHandler(async (req, res) => {
    const { teamName, password, isAdmin } = req.body;

    const userExists = await User.findOne({ teamName });
    if (userExists) {
        throw new Error("user already exists");
    }
    const user = await User.create({
        teamName,
        password,
        isAdmin,
    });
    if (user) {
        res.status(201).json({
            id: user._id,
            teamName: user.teamName,
            password: user.password,
            isAdmin: user.isAdmin,
            currentMoney: user.currentMoney,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("user not found");
    }
});

// authenticate user while login
const authUser = asyncHandler(async (req, res) => {
    const { teamName, password } = req.body;

    let user = await User.findOne({ teamName });
    if (user && (await user.verify(password))) {
        res.status(201).json({
            id: user._id,
            teamName: user.teamName,
            password: user.password,
            isAdmin: user.isAdmin,
            currentMoney: user.currentMoney,
            token: generateToken(user._id),
        });
        console.log("user found");
    } else {
        res.status(400);

        throw new Error("USER NOT FOUND");
    }
});

const updCurrMoney = async (id, price) => {
    await User.findByIdAndUpdate(id, { currentMoney: price });
};

const updPrevCurrMoney = async (userName, price) => {
    let user = await User.findOne({ teamName: userName });
    //console.log(user);
    let newmoney = user.currentMoney + price;
    //console.log("new Money is ",newmoney);
    await User.findOneAndUpdate(
        { teamName: userName },
        { currentMoney: user.currentMoney + price }
    );
    return user.currentMoney;
};

export {
    createUser,
    authUser,
    updateUserMoney,
    getUser,
    updCurrMoney,
    updPrevCurrMoney,
};
