const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        rollNo: {
            type: Number,
            // unique : true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        subject: {
            type: String,
        },
        gender: {
            type: String,
        },
        profilePhoto: {
            type: String,
            default: "no photo",
        },
    }
)

mongoose.model("User", userSchema);
