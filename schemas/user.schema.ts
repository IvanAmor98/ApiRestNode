import mongoose from 'mongoose';
import { mongo } from './../controller';

interface UserInterface {
    _id?: string,
    email?: string,
    username?: string,
    password?: string
}

class UserClass implements UserInterface {
    _id?: string;
    email?: string;
    username?: string;
    password?: string;
}

const userSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

userSchema.loadClass(UserClass);

export const User = mongo.model<UserInterface>("User", userSchema);