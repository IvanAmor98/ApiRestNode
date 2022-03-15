import mongoose from 'mongoose';
import { mongo } from './../controller';

//Declara la interfaz que usara el modelo
interface FacilityInterface {
    _id?: string,
    name?: string,
    country?: string,
    state?: string,
    latitude?: number,
    longitude?: number
}

//Declara la clase
class FacilityClass implements FacilityInterface {
    _id?: string;
    name?: string;
    country?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
}

//Declara el esquema
const facilitySchema = new mongoose.Schema({
    name: {type: String},
    country: {type: String},
    state: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

//Asigna la clase al equema creado
facilitySchema.loadClass(FacilityClass);

//Crea el modelo y lo exporta
export const Facility = mongo.model<FacilityInterface>("Facility", facilitySchema);