import { Booking, BookingInterface } from "../schemas";
import date from 'date-and-time';

export class BookingService {

    public async save(req: any, res: any) {
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
                    "result": {"success": true}
                });
            }, error => {
                console.log("ERROR: " + error);
                res.json({
                    "result": {
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
                
                res.json({
                    "result": {
                        "times": times
                    }
                });
            } else {
                res.json({
                    "result": {
                        "times": []
                    }
                });
            }
        });
    }

    public async getAllByUser(req: any, res: any) {
        Booking.find({user: req.body.userId}, null, {sort: {date: 1, timeFrom: 1}}, (error: any, result: any) => {
            if (result != null) {
                res.json({
                    "result": {
                        "bookings": result
                    }
                });
            } else {
                console.log("No bookings found");
                res.json({
                    "result": {
                        "bookigns": null,
                        "errorData": "No bookings found"
                    }
                });
            }
        });
    }

    public async deleteById(req: any, res: any) {
        Booking.deleteOne({_id: req.body._id}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                res.json({
                    "result": {
                        "deleted": false,
                        "errorData": error
                    }
                });
            } 
            if (result) {
                res.json({
                    "result": {
                        "deleted": true,
                        "resultData": result
                    }
                });
            }
        });
    }

    public async updatePaidById(req: any, res: any) {
        Booking.findOneAndUpdate({_id: req.body._id}, {$set: { paid: req.body.paid }}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                res.json({
                    "result": {
                        "updated": false,
                        "errorData": error
                    }
                });
            } 
            if (result) {
                res.json({
                    "result": {
                        "updated": true,
                        "resultData": result
                    }
                });
            }
        });
    }
}