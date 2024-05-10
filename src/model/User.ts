import mongoose, {Schema, Document} from "mongoose";
import { emailregex, passwordregex } from "../helpers/regex";

// Interfaces
// Interface for Message
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

// Interface for User
export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
}

// Mongoose Schema
// Schema for Message
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Schema for User
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        // Check if email is valid
        match: [emailregex, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        // Check if password is valid
        match: [passwordregex, "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

// Model export (it is different from normal export)
// NextJs doesnt know whether the application is bootup for first time or not. So, we need to check if the model is already created or not.

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;