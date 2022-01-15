import mongoose, { Schema } from 'mongoose';
import { mongo } from './../controller';

export interface BookingInterface {
    _id?: string,
    user?: string,
    facility?: string,
    facilityName?: string,
    timeFrom?: number,
    timeTo?: number,
    paid?: boolean
}

class BookingClass implements BookingInterface {
    _id?: string;
    user?: string;
    facility?: string;
    facilityName?: string;
    timeFrom?: number;
    timeTo?: number;
    paid?: boolean;
}

const bookingSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    facility: {type: Schema.Types.ObjectId, ref: 'Facility'},
    facilityName: {type: String},
    timeFrom: {type: Number},
    timeTo: {type: Number},
    paid: {type: Boolean}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

bookingSchema.loadClass(BookingClass);

export const Booking = mongo.model<BookingInterface>('Booking', bookingSchema);