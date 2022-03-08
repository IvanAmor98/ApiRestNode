import express from 'express';
import jwt from 'jsonwebtoken';
import {
    UserService,
    FacilityService,
    BookingService
} from '../services/';

export const globalRouter = express.Router();

const userService = new UserService();
const facilityService = new FacilityService();
const bookingService = new BookingService();

globalRouter.post('/user/signup', (req, res) => {
    userService.addUser(req, res).catch(err => console.log(err));
});

globalRouter.post('/user/login', (req, res) => {
    userService.checkUserCredentials(req, res).catch(err => console.log(err));
});

globalRouter.post('/user/googleLogin', (req, res) => {
    userService.checkGoogleCredentials(req, res).catch(err => console.log(err));
});

globalRouter.post('/facility/list', verifyToken, (req, res) => {
    facilityService.getAll(req, res).catch(err => console.log(err));
});

globalRouter.post('/facility/getById', verifyToken, (req, res) => {
    facilityService.getById(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/newBooking', verifyToken, (req, res) => {
    bookingService.save(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/getReservedTimes', verifyToken, (req, res) => {
    bookingService.getReservedTimes(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/getAllByUser', verifyToken, (req, res) => {
    bookingService.getAllByUser(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/deleteById', verifyToken, (req, res) => {
    bookingService.deleteById(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/updatePaidById', verifyToken, (req, res) => {
    bookingService.updatePaidById(req, res).catch(err => console.log(err));
});

function verifyToken(req: any, res: any, next: any) {
    if (!req.headers.authorization) return res.status(401).send("Necesita estar logeado para ver este contenido");
    console.log(req.headers.authorization);

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send("Necesita estar logeado para ver este contenido");
    const payLoad = jwt.verify(token, 'secretKey');

    console.log("Payload: " + payLoad);
    req.body.token = payLoad;

    next();
}