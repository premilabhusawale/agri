
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Your Name"]
    },
    surname: {
        type: String,
        required: [true, "Enter Your Surname"]
    },
    mobile: {
        type: Number,
        required: [true, "Enter Your Mobile No"]
    },
    email: {
        type: String,
        required: [true, "Enter Your Email"]
    },
    password: {
        type: String,
        required: [true, "Enter Your Password"]
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'FARMER'],
        default: "CUSTOMER"
    },
    photo: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    wishlist: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],

    language: {
        type: String,
        enum: ['en', 'hi', 'mr'],
        default: 'en'
    }
})


const User = mongoose.model('users', userSchema);
module.exports = User