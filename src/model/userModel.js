const { access } = require('fs');
const mongoose = require('mongoose');
const { userInfo } = require('os');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    phone: Number,

    role: {
        type: String,
        enum: ['staff', 'admin'],
        default: 'staff'
    },

    address:{
        type: String,
        default:"Parbhani"
    },
    accessToken: {
        type: String,
    }

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);