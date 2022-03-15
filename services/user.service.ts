import { User } from './../schemas'
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

export class UserService {

    //Inicializa el cliente de autenticacion de google
    client = new OAuth2Client('398083326352-15014911vi45dfqc5c6v29q6ut5hc8cm.apps.googleusercontent.com');

    //Regitra un nuevo usuario en la base de datos
    public async addUser(req: any, res: any) {
        //Crea el modelo
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isGoogleAccount: false
        });

        //Comprueba si existe un usuario con el mismo email
        User.findOne({email: newUser.email}, (error: any, result: any) => {
            if (error) {
                //Controla si se produce un error
                console.log("ERROR: " + error);
                res.status(200).json({
                    "result": {
                        "alreadyExists": false,
                        "error": error
                    }
                });
            }
            //Si el resultado es nulo significa que el email no esta registrado
            if (result == null) {
                //Crea el usuario en la base de datos
                User.create(newUser).then(
                    //Si no hay problemas responde a la peticion
                    succes => {
                        res.json({
                            "result": {"alreadyExists": false}
                        });
                    }, 
                    //Si se produce un error lo devuelve a la peticion
                    error => {
                        console.log("ERROR: " + error);
                        res.json({
                            "result": {
                                "alreadyExists": false,
                                "error": error
                            }
                        });
                    }
                );
            //Si el resultado no es nulo signifia que el usuario ya existe    
            } else {
                res.status(200).json({
                    "result": {
                        "alreadyExists": true
                    }
                });
            }
        });
    }

    //Comprueba que los datos de usuario son correctos
    public async checkUserCredentials(req: any, res: any) {
        //Comprueba si existe un usuario con el email proporcionado
        User.findOne({email: req.body.email}, (error: any, result: any) => {
            //Control de error
            if (error) {
                console.log(error);
                
                res.status(200).json({
                    "result": {
                        "success": false,
                        "error": true,
                        "errorData": error
                    }
                });
            }
            //Si existe comprueba que la contraseña sea correcta
            if (result) {
                if (req.body.password == result.password) {
                    //Si la contraseña es correcta se genera un token y lo devuelve
                    const token = jwt.sign({ _id: result._id }, 'secretKey')
                    res.status(200).json({
                        "result": {
                            "success": true,
                            "successData": {
                                "_id": result._id,
                                "email": result.email,
                                "username": result.username,
                                "token": token
                            },
                            "error": false
                        }
                    });
                //Si la contraseña es incorrecta devuelve un error
                } else {
                    console.log("No encontrado");
                    res.status(200).json({
                        "result": {
                            "success": false,
                            "error": true,
                            "errorData": "Invalid credentials"
                        }
                    });
                }
            //Si no existe el email devuelve un error
            } else {
                console.log("No encontrado");
                res.status(200).json({
                    "result": {
                        "success": false,
                        "error": true,
                        "errorData": "User not found"
                    }
                });
            }
        });
    }

    //Comprueba que la cuenta de google sea valida
    public async checkGoogleCredentials(req: any, res: any) {
        //Comprueba que el token proporcionado sea valido
        const userId = await this.verifyGoogleToken(req.body.googleToken);
        
        //Una vez verificado el token, comprueba si el usuario ha sido registrado previamente y si no, lo registra
        User.findOneAndUpdate({googleId: userId, isGoogleAccount: true},
          {$set: {email: req.body.email, username: req.body.email, password: req.body.password}},
          {upsert: true, new: true}, (error: any, result: any) => {
            //Comprueba errores
            if (error) {
                console.log(error);
                res.status(200).json({
                    "result": {
                        "success": false,
                        "error": true,
                        "errorData": error
                    }
                });
            }
            //Si todo es correcto, genera su propio token y lo devuelve
            if (result) {
                const token = jwt.sign({ _id: result._id }, 'secretKey');
                res.status(200).json({
                    "result": {
                        "success": true,
                        "successData": {
                            "_id": result._id,
                            "email": result.email,
                            "username": result.email,
                            "token": token
                        },
                        "error": false
                    }
                });  
            //Por si acaso, aqui no deberia llegar nunca      
            } else {
                console.log("No encontrado");
                res.status(200).json({
                    "result": {
                        "success": false,
                        "error": true,
                        "errorData": "User not found"
                    }
                });
            }
        });
    }

    //Comprueba que el token proporcionado sea valido
    public async verifyGoogleToken(googleToken: string): Promise<string> {
        //Pide al cliente de google que verifique el token
        const ticket = await this.client.verifyIdToken({
            idToken: googleToken,
            audience: '398083326352-mcce8uhaf9golv4h6avm65uneijtljt7.apps.googleusercontent.com',
        });
        
        //Si existe un payload lo devuelvo
        const payload = ticket.getPayload();
        if (!!payload) {
            return payload.sub
        }
        
        return '';
    }
}