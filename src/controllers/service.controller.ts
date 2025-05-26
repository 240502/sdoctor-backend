import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ServicesService } from '../services/services.service';

@injectable()
export class ServiceController {
    constructor(private doctorServiceService: ServicesService) {}
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
    async getServiceByDepartmentId(req: Request, res: Response): Promise<void> {
        const { departmentId } = req.params;
        try {
            const result =
                await this.doctorServiceService.getServiceByDepartmentId(
                    Number(departmentId),
                );
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
