import mongoose from 'mongoose';
import { mongo } from './../controller';

//Declara la interfaz que usara el modelo
interface UserInterface {
    _id?: string,
    email?: string,
    username?: string,
    password?: string,
    isGoogleAccount?: boolean,
    googleId?: string
}

//Declara la clase
class UserClass implements UserInterface {
    _id?: string;
    email?: string;
    username?: string;
    password?: string;
    isGoogleAccount?: boolean;
    googleId?: string;
}

//Declara el esquema
const userSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    isGoogleAccount: {type: Boolean},
    googleId: {type: String}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

//Asigna la clase al equema creado
userSchema.loadClass(UserClass);

//Crea el modelo y lo exporta
export const User = mongo.model<UserInterface>("User", userSchema);