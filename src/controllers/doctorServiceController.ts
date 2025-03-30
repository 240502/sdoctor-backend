import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { DoctorServiceService } from '../services/doctorService.service';

@injectable()
export class DoctorServiceController {
    constructor(private doctorServiceService: DoctorServiceService) {}
    async getAllDoctorServices(req: Request, res: Response): Promise<void> {
        try {
            const result =
                await this.doctorServiceService.getAllDoctorService();
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
