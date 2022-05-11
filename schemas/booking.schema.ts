import mongoose, { Schema } from 'mongoose';
import { mongo } from './../controller';

//Declara la interfaz que usara el modelo
export interface BookingInterface {
    _id?: string,
    user?: string,
    facility?: string,
    facilityName?: string,
    type?: number,
    timeFrom?: number,
    timeTo?: number,
    paid?: boolean,
    checked?: boolean
}

//Declara la clase
class BookingClass implements BookingInterface {
    _id?: string;
    user?: string;
    facility?: string;
    facilityName?: string;
    type?: number;
    timeFrom?: number;
    timeTo?: number;
    paid?: boolean;
    checked?: boolean;
}

//Declara el esquema
const bookingSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    facility: {type: Schema.Types.ObjectId, ref: 'Facility'},
    facilityName: {type: String},
    type: {type: Number},
    timeFrom: {type: Number},
    timeTo: {type: Number},
    paid: {type: Boolean},
    checked: {type: Boolean}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

//Asigna la clase al equema creado
bookingSchema.loadClass(BookingClass);

//Crea el modelo y lo exporta
export const Booking = mongo.model<BookingInterface>('Booking', bookingSchema);