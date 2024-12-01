import { injectable } from 'tsyringe';
import { AppointmentStatusService } from '../services/appointment_statusService';
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
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
