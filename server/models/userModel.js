import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const mySchema = new mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        playersBought: {
            type: Array,
            default: [],
        },
        money:{
            type: Number,
            default: 10000
        },
        currentMoney: {
            type: Number,
            default: 10000,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

mySchema.methods.verify = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
};

mySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    let salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const user = mongoose.model("user", mySchema);
export default user;
