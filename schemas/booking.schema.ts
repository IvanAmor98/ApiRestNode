import mongoose, { Schema } from 'mongoose';
import { mongo } from './../controller';

interface BookingInterface {
    _id?: string,
    user?: string,
    facility?: string,
    date?: string
}

class BookingClass implements BookingInterface {
    _id?: string;
    user?: string;
    facility?: string;
    date?: string;
}

const bookingSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    facility: {type: Schema.Types.ObjectId, ref: 'Facility'},
    date: {type: String},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

bookingSchema.loadClass(BookingClass);

export const Booking = mongo.model<BookingInterface>('Booking', bookingSchema);