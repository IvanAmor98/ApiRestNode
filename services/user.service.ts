import { User } from './../schemas'
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';

export class UserService {

    client = new OAuth2Client('398083326352-15014911vi45dfqc5c6v29q6ut5hc8cm.apps.googleusercontent.com');

    public async addUser(req: any, res: any) {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isGoogleAccount: false
        });

        User.findOne({email: newUser.email}, (error: any, result: any) => {
            if (error) {
                console.log("ERROR: " + error);
                res.status(200).json({
                    "result": {
                        "alreadyExists": false,
                        "error": error
                    }
                });
            }
            if (result == null) {
                User.create(newUser).then(
                    succes => {
                        res.json({
                            "result": {"alreadyExists": false}
                        });
                    }, error => {
                        console.log("ERROR: " + error);
                        res.json({
                            "result": {
                                "alreadyExists": false,
                                "error": error
                            }
                        });
                    }
                );
            } else {
                res.status(200).json({
                    "result": {
                        "alreadyExists": true
                    }
                });
            }
        });
    }

    public async checkUserCredentials(req: any, res: any) {
        User.findOne({email: req.body.email}, (error: any, result: any) => {
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
            if (result) {
                if (req.body.password == result.password) {
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

    public async checkGoogleCredentials(req: any, res: any) {
        const userId = await this.verifyGoogleToken(req.body.googleToken);
        
        User.findOneAndUpdate({googleId: userId, isGoogleAccount: true},
          {$set: {email: req.body.email, username: req.body.email, password: req.body.password}},
          {upsert: true, new: true}, (error: any, result: any) => {
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

    public async verifyGoogleToken(googleToken: string): Promise<string> {
        const ticket = await this.client.verifyIdToken({
            idToken: googleToken,
            audience: '398083326352-mcce8uhaf9golv4h6avm65uneijtljt7.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        if (!!payload) {
            return payload.sub
        }
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return '';
    }
}