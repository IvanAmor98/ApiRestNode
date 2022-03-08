import { User } from './../schemas'
import jwt from 'jsonwebtoken';

export class UserService {

    public async addUser(req: any, res: any) {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
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
                                "email": result.username,
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
        User.findOneAndUpdate(req.body.googleToken, {$set: {name: 'SOME_VALUE'}}, {upsert: true}, (error: any, result: any) => {
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
                                "email": result.username,
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
}