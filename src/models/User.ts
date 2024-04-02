// src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User document
export interface UserDocument extends Document {
    fullName: string;
    email: string;
    password: string;
    lawFirm: string;
    areaOfPractice: string;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lawFirm: { type: String, required: true },
    areaOfPractice: { type: String, required: true }
});

// Create the User model
const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;

