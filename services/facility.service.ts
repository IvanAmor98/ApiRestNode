import { Facility } from "../schemas";

export class FacilityService {

    //Devuelve la lista de todas las instalaciones
    public async getAll(req: any, res: any) {
        Facility.find({}, (error: any, result: any) => {
            if (error) {
                console.log(error);
                res.json({"result": null});
            } else {
                res.json({"result": {
                    "facilityListResult": result
                }});
            }
        });
    }

    //Devuelve la instalacion con el id especificado
    public async getById(req: any, res: any) {
        Facility.findOne({_id: req.body.id}, (error: any, result: any) => {
            if (error) {
                res.json({"result": {
                    "facility": null,
                    "errorData": error
                }});
            }
            if (result) {
                res.json({"result": {
                    "facility": result
                }});
            } else {
                res.json({"result": {
                    "facility": null,
                    "errorData": "No facility found"
                }});
            }
        });
    }

}