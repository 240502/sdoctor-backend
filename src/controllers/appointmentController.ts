import { injectable } from 'tsyringe';
import { AppointmentService } from '../services/appointmentService';
import { Appointment } from '../models/appointment';
import { Request, Response } from 'express';
@injectable()
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    async getQuantityRejectedAppointmentByYearAndMonth(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { year, month } = req.body;
            const data: number =
                await this.appointmentService.getQuantityRejectedAppointmentByYearAndMonth(
                    year,
                    month,
                );
            if (data) {
                res.json({ total: data });
            } else {
                res.status(404).json({
                    message: 'Không có lịch hẹn bị hủy!',
                });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getAllAppointmentByYearAndMonth(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { year, month } = req.body;
            const data: number =
                await this.appointmentService.getAllAppointmentByYearAndMonth(
                    year,
                    month,
                );
            if (data) {
                res.json({ total: data });
            } else {
                res.status(404).json({
                    message: 'Không có lịch hẹn nào!',
                });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async orderAppointment(req: Request, res: Response): Promise<void> {
        try {
            const appointment: Appointment = req.body as Appointment;
            await this.appointmentService.orderAppointment(appointment);
            res.json({ message: 'Successfully', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async viewDetailAppointmentForPatient(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { pageIndex, pageSize, phone, statusId } = req.body;
            const data =
                await this.appointmentService.viewDetailAppointmentForPatient(
                    pageIndex,
                    pageSize,
                    phone,
                    statusId,
                );
            if (data) {
                res.json(data);
            } else res.status(404).json({ message: 'Không có dữ liệu!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async cancelAppointment(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.appointmentService.cancelAppointment(id);

            res.status(200).json({ message: 'Successfully!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
