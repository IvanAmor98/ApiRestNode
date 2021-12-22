import mongoose from 'mongoose';
 
export const mongo = mongoose.createConnection('mongodb://127.0.0.1:27017/ProyectDB');