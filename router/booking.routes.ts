import express from 'express';
import { BookingService } from '../services/';
import { verifyToken } from '../middleware/'

//Crea el router y lo exporta
export const bookingRouter = express.Router();

//Inicializa el servicio
const bookingService = new BookingService();

//Asigna las rutas con sus correspondientes servicios
bookingRouter.post('/newBooking', verifyToken, (req, res) => {
    bookingService.save(req, res).catch(err => console.log(err));
});

bookingRouter.post('/getReservedTimes', verifyToken, (req, res) => {
    bookingService.getReservedTimes(req, res).catch(err => console.log(err));
});

bookingRouter.post('/getAllByUser', verifyToken, (req, res) => {
    bookingService.getAllByUser(req, res).catch(err => console.log(err));
});

bookingRouter.post('/deleteById', verifyToken, (req, res) => {
    bookingService.deleteById(req, res).catch(err => console.log(err));
});

bookingRouter.post('/updatePaidById', verifyToken, (req, res) => {
    bookingService.updatePaidById(req, res).catch(err => console.log(err));
});

bookingRouter.post('/updateCheckedById', verifyToken, (req, res) => {
    bookingService.updateCheckedById(req, res).catch(err => console.log(err));
});