import express from 'express';
import { UserService, FacilityService } from '../services/';

export const globalRouter = express.Router();

const userService = new UserService();
const facilityService = new FacilityService();

globalRouter.post('/user/signup', (req, res) => {
    userService.addUser(req, res).catch(err => console.log(err));
});

globalRouter.post('/user/login', (req, res) => {
    userService.checkUserCredentials(req, res).catch(err => console.log(err));
});

globalRouter.get('/facility/list', (req, res) => {
    facilityService.getAll(req, res).catch(err => console.log(err));
});

globalRouter.post('/facility/getById', (req, res) => {
    facilityService.getById(req, res).catch(err => console.log(err));
});