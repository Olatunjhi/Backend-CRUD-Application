const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    } catch (error) {

        console.error("error connecting database", error);
        return exit(1);
    }
}

module.exports = connectDb