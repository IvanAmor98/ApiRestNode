import { Booking, BookingInterface } from "../schemas";
import date from 'date-and-time';

export class BookingService {

    public async save(req: any, res: any) {
        console.log("Save:" + req.body.facilityName);
        
        const newBooking = new Booking({
            user: req.body.userId,
            facility: req.body.facilityId,
            facilityName: req.body.facilityName,
            timeFrom: req.body.timeFrom,
            timeTo: req.body.timeTo,
            paid: req.body.paid
        });

        Booking.create(newBooking).then(
            succes => {
                res.json({
                    "bookingResult": {"success": true}
                });
            }, error => {
                console.log("ERROR: " + error);
                res.json({
                    "bookingResult": {
                        "success": false,
                        "error": true,
                        "errorData": error
                    }
                });
            }
        );
    }

    public async getReservedTimes(req: any, res: any) {
        Booking.find({timeFrom: {$gte: req.body.from, $lte: req.body.to}}, (error: any, result: any) => {
            if (result != null) {
                const times: [Number, Number][] = [];
                result.forEach((element: BookingInterface) => {
                    times.push([element.timeFrom!, element.timeTo!]);
                });
                console.log(times);
                
                res.json({
                    "bookingResult": {
                        "times": times
                    }
                });
            } else {
                res.json({
                    "bookingResult": {
                        "times": []
                    }
                });
            }
        });
    }

    public async getAllByUser(req: any, res: any) {
        console.log(req.body);
        
        Booking.find({user: req.body.userId}, null, {sort: {date: 1, timeFrom: 1}}, (error: any, result: any) => {
            if (result != null) {
                console.log(result);
                
                res.json({
                    "bookingResult": {
                        "bookings": result
                    }
                });
            } else {
                console.log("No bookings found");
                
                res.json({
                    "bookingResult": {
                        "bookigns": null,
                        "errorData": "No bookings found"
                    }
                });
            }
        });
    }

    public async deleteById(req: any, res: any) {
        console.log(req.body);
        
        Booking.deleteOne({_id: req.body._id}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                res.json({
                    "bookingResult": {
                        "deleted": false,
                        "errorData": error
                    }
                });
            } 
            if (result) {
                console.log(result);
                res.json({
                    "bookingResult": {
                        "deleted": true,
                        "resultData": result
                    }
                });
            }
        });
    }

    public async updatePaidById(req: any, res: any) {
        console.log(req.body);
        
        Booking.findOneAndUpdate({_id: req.body._id}, {$set: { paid: req.body.paid }}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                res.json({
                    "bookingResult": {
                        "updated": false,
                        "errorData": error
                    }
                });
            } 
            if (result) {
                console.log(result);
                res.json({
                    "bookingResult": {
                        "updated": true,
                        "resultData": result
                    }
                });
            }
        });
    }
}