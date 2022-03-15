import mongoose from 'mongoose';
 
//Crea la conexion al servidor mongo 
//y la exporta para que pueda ser usada por los servicios
export const mongo = mongoose.createConnection('mongodb://127.0.0.1:27017/ProyectDB');