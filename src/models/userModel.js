import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Provide username"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "Please Provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please Provide password"],
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:String,
    verifyToken:String,
    verifyTokenExpiry:String,
},
{
    timestamps:true
})

const User = mongoose.models.users || mongoose.model("users", UserSchema)

export default User;