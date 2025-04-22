import { injectable } from 'tsyringe';
import { AppointmentStatusService } from '../services/appointment_status.service';
import { Request, Response } from 'express';

@injectable()
export class AppointmentStatusController {
    constructor(private appointmentStatusService: AppointmentStatusService) {}

    async getAllAppointmentStatus(req: Request, res: Response): Promise<void> {
        try {
            const results =
                await this.appointmentStatusService.getAllAppointmentStatus();
            if (results) {
                res.json(results);
            } else {
                res.status(404).json({ message: 'Không có dữ liệu !' });
            }
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
