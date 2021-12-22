import mongoose from 'mongoose';
import { mongo } from './../controller';

interface FacilityInterface {
    _id?: string,
    name?: string,
    country?: string,
    state?: string,
    latitude?: number,
    longitude?: number
}

class FacilityClass implements FacilityInterface {
    _id?: string;
    name?: string;
    country?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
}

const facilitySchema = new mongoose.Schema({
    name: {type: String},
    country: {type: String},
    state: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}});

facilitySchema.loadClass(FacilityClass);

export const Facility = mongo.model<FacilityInterface>("Facility", facilitySchema);