import { injectable, inject } from 'tsyringe';
import { AppointmentService } from '../services/appointmentService';
import { Appointment } from '../models/appointment';
import { Request, Response } from 'express';
import { getSocket } from '../socket';
import { Socket } from 'socket.io';
import { sendConfirm, sendRejection } from '../mailer';
import { DoctorService } from '../services/doctorService';
import { Doctor } from '../models/doctor';
@injectable()
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    async getAppointmentByType(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize, doctorId, type } = req.body;
            const result = await this.appointmentService.getAppointmentByType(
                pageIndex,
                pageSize,
                doctorId,
                type,
            );
            if (result) {
                res.json({
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    totalItems: result[0].RecordCount,
                    data: result,
                    doctorId: doctorId,
                    type: type,
                    pageCount: Math.ceil(result[0].RecordCount / pageSize),
                });
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTotalPatientInDay(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data = await this.appointmentService.getTotalPatientInDay(id);
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
            const { pageIndex, pageSize, doctorId } = req.body;
            const data = await this.appointmentService.getAppointmentInDay(
                pageIndex,
                pageSize,
                doctorId,
            );
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    doctorId: doctorId,
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
            const id = Number(req.params.id);
            const data =
                await this.appointmentService.getTotalPatientExaminedInDay(id);
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
            const { startWeek, endWeek, doctorId } = req.body;
            const results =
                await this.appointmentService.getTotalPriceAppointmentByWeek(
                    startWeek,
                    endWeek,
                    doctorId,
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

    async getTotalAppointmentByWeek(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { startWeek, endWeek, doctorId } = req.body;
            const results =
                await this.appointmentService.getTotalAppointmentByWeek(
                    startWeek,
                    endWeek,
                    doctorId,
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
            await sendConfirm(
                String(appointment.patient_name),
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

    async updateAppointmentStatus(req: Request, res: Response): Promise<void> {
        try {
            const { appointment, requirementObject } = req.body;
            await this.appointmentService.updateAppointmentStatus(
                appointment.id,
                appointment.status_id,
                appointment.rejectionReason,
            );
            res.status(200).json({ message: 'Successfully!' });
            if (appointment?.rejectionReason) {
                await sendRejection(
                    appointment.patient_email,
                    appointment.doctor_name,
                    appointment.patient_name,
                    appointment.time_value,
                    appointment.appointment_date,
                    appointment.rejectionReason,
                    requirementObject,
                );
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
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
