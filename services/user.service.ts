import { User } from './../schemas'

export class UserService {

    public async addUser(req: any, res: any) {
        console.log(req.body);
        
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.findOne({email: newUser.email}, (error: any, result: any) => {
            if (error) {
                console.log("ERROR: " + error);
                res.status(200).json({
                    "signupResult": {
                        "alreadyExists": false,
                        "error": error
                    }
                });
            }
            if (result == null) {
                User.create(newUser).then(
                    succes => {
                        res.json({
                            "signupResult": {"alreadyExists": false}
                        });
                    }, error => {
                        console.log("ERROR: " + error);
                        res.json({
                            "signupResult": {
                                "alreadyExists": false,
                                "error": error
                            }
                        });
                    }
                );
            } else {
                console.log("RESULT: " + result);
                res.status(200).json({
                    "signupResult": {
                        "alreadyExists": true
                    }
                });
            }
        });
    }

    public async checkUserCredentials(req: any, res: any) {
        console.log(req.body);
        
        User.findOne({email: req.body.email}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                
                res.status(200).json({
                    "loginResult": {
                        "success": false,
                        "error": true,
                        "errorData": error
                    }
                });
            }
            if (result) {
                console.log(result);
                
                if (req.body.password == result.password) {
                    res.status(200).json({
                        "loginResult": {
                            "success": true,
                            "successData": {
                                "_id": result._id,
                                "email": result.username,
                                "username": result.username
                            },
                            "error": false
                        }
                    });
                } else {
                    console.log("No encontrado");
                    res.status(200).json({
                        "loginResult": {
                            "success": false,
                            "error": true,
                            "errorData": "Invalid credentials"
                        }
                    });
                }
            } else {
                console.log("No encontrado");
                res.status(200).json({
                    "loginResult": {
                        "success": false,
                        "error": true,
                        "errorData": "User not found"
                    }
                });
            }
        });
    }
}