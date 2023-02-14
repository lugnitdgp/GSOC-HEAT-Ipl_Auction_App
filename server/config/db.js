import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(
            process.env.NODE_ENV === "production"
                ? process.env.MONGODB_URI
                : process.env.MONGODB_URI_LOCAL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }
        );
        console.log("Connected to databse...");
    } catch (err) {
        console.log(err);
        process.exit();
    }
};
export default connectDb;
