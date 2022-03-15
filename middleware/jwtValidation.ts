import jwt from 'jsonwebtoken';

//Middleware que se encarga de que el token recibido sea valido
export function verifyToken(req: any, res: any, next: any) {
    //Comprueba is existe el header, si no, devuelve error
    if (!req.headers.authorization) return res.status(401).send("Necesita estar logeado para ver este contenido");

    //Comprueba que el header no este vacio
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send("Necesita estar logeado para ver este contenido");
    
    //Recupera el payload del token
    const payLoad = jwt.verify(token, 'secretKey');

    //Si el token es valido se asigna el payload al request y continua
    req.body.token = payLoad;

    next();
}