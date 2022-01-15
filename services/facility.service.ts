import { Facility } from "../schemas";

export class FacilityService {

    public async getAll(req: any, res: any) {
        Facility.find({}, (error: any, result: any) => {
            if (error) {
                res.json({"facilityListResult": null});
            } else {
                res.json({"facilityListResult": result});
            }
        });
    }

    public async getById(req: any, res: any) {
        Facility.findOne({_id: req.body.id}, (error: any, result: any) => {
            if (error) {
                res.json({"facilityResult": {
                    "facility": null,
                    "errorData": error
                }});
            }
            if (result) {
                res.json({"facilityResult": {
                    "facility": result
                }});
            } else {
                res.json({"facilityResult": {
                    "facility": null,
                    "errorData": "No facility found"
                }});
            }
        });
    }

}