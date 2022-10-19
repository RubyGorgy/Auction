const mongoose = require('mongoose');
// import mongoose from "mongoose";


const UserSchema = {
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
       type: String,
       required: true,
       unique: true
    },
    password: {
       type: String,
       required: true
    },
    avatar: {
       type: String,
       default: "no_image.jpeg"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}

module.exports = mongoose.model('User', UserSchema);
// export default User;
