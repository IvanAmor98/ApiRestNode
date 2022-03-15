import express from 'express';
import { FacilityService } from '../services/';
import { verifyToken } from '../middleware/'

//Crea el router y lo exporta
export const facilityRouter = express.Router();

//Inicializa el servicio
const facilityService = new FacilityService();

//Asigna las rutas con sus correspondientes servicios
facilityRouter.post('/list', verifyToken, (req, res) => {
    facilityService.getAll(req, res).catch(err => console.log(err));
});

facilityRouter.post('/getById', verifyToken, (req, res) => {
    facilityService.getById(req, res).catch(err => console.log(err));
});