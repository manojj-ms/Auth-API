require("dotenv").config();
const mongoose = require("mongoose");
const connection_string = process.env.CONNECTION_STRING;


const connectDB = async () => {
    try {
        await mongoose.connect(connection_string, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("MongoDB connection eshtablished")
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
    }
}

module.exports = connectDB;