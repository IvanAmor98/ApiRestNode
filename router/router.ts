import express from 'express';
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

globalRouter.post('/facility/list', (req, res) => {
    facilityService.getAll(req, res).catch(err => console.log(err));
});

globalRouter.post('/facility/getById', (req, res) => {
    facilityService.getById(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/newBooking', (req, res) => {
    bookingService.save(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/getReservedTimes', (req, res) => {
    bookingService.getReservedTimes(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/getAllByUser', (req, res) => {
    bookingService.getAllByUser(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/deleteById', (req, res) => {
    bookingService.deleteById(req, res).catch(err => console.log(err));
});

globalRouter.post('/booking/updatePaidById', (req, res) => {
    bookingService.updatePaidById(req, res).catch(err => console.log(err));
});