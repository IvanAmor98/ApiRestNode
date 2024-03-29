import { Booking, BookingInterface } from "../schemas";
import date from 'date-and-time';

export class BookingService {

    //Guarda una nueva reserva
    public async save(req: any, res: any) {
        //Crea el modelo
        const newBooking = new Booking({
            user: req.body.userId,
            facility: req.body.facilityId,
            facilityName: req.body.facilityName,
            type: req.body.type,
            timeFrom: req.body.timeFrom,
            timeTo: req.body.timeTo,
            paid: req.body.paid,
            checked: false
        });

        //Lo guarda en la base de datos
        Booking.create(newBooking).then(
            //Si no hay problemas devuelve Ok
            result => {
                res.json({
                    "result": {
                        "_id": result.id,
                        "success": true
                    }
                });
            }, 
            //Si hay algun error lo devuelve
            error => {
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
        Booking.find({facility: req.body._id, timeFrom: {$gte: req.body.from, $lte: req.body.to}, type: req.body.type}, (error: any, result: any) => {
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

    //Devuelve todas las reservas pendientes del usuario especificado
    public async getAllByUser(req: any, res: any) {
        Booking.find({user: req.body.userId, timeFrom: {$gte: req.body.date}}, null, {sort: {date: 1, timeFrom: 1}}, (error: any, result: any) => {
            //Devuelve el resultado
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

    //Elimina la reserva con el id especificado
    public async deleteById(req: any, res: any) {
        Booking.deleteOne({_id: req.body._id}, (error: any, result: any) => {
            if (error) {
                //Control de errores
                console.log(error);
                res.json({
                    "result": {
                        "deleted": false,
                        "errorData": error
                    }
                });
            } 
            //Devuelve el resultado
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

    //Asigna como pagada la reserva con el id especificado
    public async updatePaidById(req: any, res: any) {
        Booking.findOneAndUpdate({_id: req.body._id}, {$set: { paid: req.body.paid }}, (error: any, result: any) => {
            if (error) {
                //Control de errores
                console.log(error);
                res.json({
                    "result": {
                        "updated": false,
                        "errorData": error
                    }
                });
            } 
            //Devuelve resultado
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

    //Marca como empezada la reserva con el id especificado
    //Se llama cuando un usuario admin lee el codigo qr de la reserva
    public async updateCheckedById(req: any, res: any) {
        Booking.findOneAndUpdate({_id: req.body._id}, {$set: { checked: true }}, (error: any, result: any) => {
            if (error) {
                //Control de errores
                console.log(error);
                res.json({
                    "result": {
                        "updated": false,
                        "errorData": error
                    }
                });
            } 
            //Devuelve resultado
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