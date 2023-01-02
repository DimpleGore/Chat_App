const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})

const User = mongoose.model("User",userModel);

module.exports = User;