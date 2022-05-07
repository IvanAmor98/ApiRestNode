import express from 'express';
import { UserService } from '../services/';

//Crea el router y lo exporta
export const userRouter = express.Router();

//Inicializa el servicio
const userService = new UserService();

//Asigna las rutas con sus correspondientes servicios
userRouter.post('/signup', (req, res) => {
    userService.addUser(req, res).catch(err => console.log(err));
});

userRouter.post('/login', (req, res) => {
    console.log(req.body);
    userService.checkUserCredentials(req, res).catch(err => console.log(err));
});

userRouter.post('/googleLogin', (req, res) => {
    console.log(req.body);
    userService.checkGoogleCredentials(req, res).catch(err => console.log(err));
});