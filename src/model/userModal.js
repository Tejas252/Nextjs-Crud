import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true,"Please enter your userName"],
        unique: true
    },
    email : {
        type: String,
        required: [true,"Please enter your email"],
        unique: true
    },
    password : {
        type: String,
        required: [true,"Please enter your password"],
        unique: true
    },
    profileImg : {
        type: String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
    isVerified : {
        type: Boolean,
        default: false,
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date, 
})

const User = mongoose.models.user || mongoose.model("user",userSchema)

export default User;