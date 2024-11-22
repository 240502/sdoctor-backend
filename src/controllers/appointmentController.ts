import { injectable, inject } from 'tsyringe';
import { AppointmentService } from '../services/appointmentService';
import { Appointment } from '../models/appointment';
import { Request, Response } from 'express';
import { getSocket } from '../socket';
import { Socket } from 'socket.io';
import { send } from '../mailer';
import { DoctorService } from '../services/doctorService';
import { Doctor } from '../models/doctor';
@injectable()
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    async getTotalPatientInDay(req: Request, res: Response): Promise<any> {
        try {
            const data = await this.appointmentService.getTotalPatientInDay();
            if (data) {
                res.json(data);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getAppointmentInDay(req: Request, res: Response): Promise<any> {
        try {
            const { pageIndex, pageSize } = req.body;
            const data = await this.appointmentService.getAppointmentInDay(
                pageIndex,
                pageSize,
            );
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTotalPatientExaminedInDay(
        req: Request,
        res: Response,
    ): Promise<any> {
        try {
            const data =
                await this.appointmentService.getTotalPatientExaminedInDay();
            if (data) {
                res.json(data);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTotalPriceAppointmentByWeek(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { startWeek, endWeek } = req.body;
            const results =
                await this.appointmentService.getTotalPriceAppointmentByWeek(
                    startWeek,
                    endWeek,
                );
            if (results.length > 0 && Array.isArray(results)) {
                res.json(results);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getRecentPatientExamined(req: Request, res: Response): Promise<void> {
        try {
            const results =
                await this.appointmentService.getRecentPatientExamined();
            if (results.length > 0 && Array.isArray(results)) {
                res.json(results);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getRecentPatientOrdered(req: Request, res: Response): Promise<void> {
        try {
            const results =
                await this.appointmentService.getRecentPatientOrdered();
            if (results.length > 0 && Array.isArray(results)) {
                res.json(results);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getRevenueByMonth(req: Request, res: Response): Promise<void> {
        try {
            const { year, month } = req.body;
            const data = await this.appointmentService.getRevenueByMonth(
                month,
                year,
            );
            if (data) {
                res.json({ totalAppointment: data });
            } else res.json({ message: 'Không có doanh thu!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

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

    async orderAppointment(req: Request, res: any): Promise<void> {
        try {
            const appointment: Appointment = req.body as Appointment;
            await this.appointmentService.orderAppointment(appointment);

            res.json({ message: 'Successfully', result: true });
            const io = getSocket();
            io.emit('newAppointment', appointment);
            await send(
                String(appointment.patient_email),
                appointment.doctor_name,
                appointment.time_value,
                String(appointment.appointment_date),
                appointment.location,
                'Chờ xác nhận',
                appointment.price,
            );
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async ViewAppointment(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize, phone, statusId } = req.body;
            const data = await this.appointmentService.ViewAppointment(
                pageIndex,
                pageSize,
                phone,
                statusId,
            );
            console.log({ pageIndex, pageSize, phone, statusId });
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    phone: phone,
                    statusId: statusId,
                });
            } else res.status(404).json({ message: 'Không có dữ liệu!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async cancelAppointment(req: Request, res: Response): Promise<void> {
        try {
            const { id, reason } = req.body;
            await this.appointmentService.cancelAppointment(id, reason);
            res.status(200).json({ message: 'Successfully!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async confirmAppointment(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            await this.appointmentService.confirmAppointment(id);

            res.status(200).json({ message: 'Successfully!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async getAppointmentById(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const data = await this.appointmentService.getAppointmentById(id);

            res.status(200).json(data);
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
