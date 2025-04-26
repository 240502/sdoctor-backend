import { injectable } from 'tsyringe';
import { AppointmentService } from '../services/appointment.service';
import { Request, Response } from 'express';
import { getSocket } from '../socket';
import dayjs from 'dayjs';
import {
    sendBookingSuccess,
    sendRejection,
    sendConfirmSuccess,
} from '../mailer';
import {
    AppointmentCreateDto,
    AppointmentFilterDto,
} from '../models/appointment';
@injectable()
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    async getAppointmentWithOptions(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const query = req.query as unknown as {
                pageSize: number;
                pageIndex: number;
                status: number;
                userId: number;
            };
            const results =
                await this.appointmentService.getAppointmentWithOptions(
                    query.pageIndex,
                    query.pageSize,
                    query.status,
                    query.userId,
                );
            if (!results) {
                return res.status(404).json({ message: 'Không có dữ liệu !' });
            }
            res.status(200).json({
                pageIndex: query.pageIndex,
                pageSize: query.pageSize,
                appointments: results,
                status: query.status,
                userId: query.userId,
                pageCount: Math.ceil(results[0].RecordCount / query.pageSize),
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async getAppointmentByUuid(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const query = req.query as unknown as {
                uuid: string;
                pageSize: number | null;
                pageIndex: number | null;
                statusId: number;
            };

            const data = await this.appointmentService.getAppointmentByUuid(
                query.uuid,
                query.pageSize,
                query.pageIndex,
                query.statusId,
            );
            if (data) {
                return res.json({
                    totalItems: data[0]?.RecordCount,
                    pageIndex: query.pageIndex,
                    pageSize: query.pageSize,
                    appointments: data,
                    pageCount: query.pageSize
                        ? Math.ceil(data[0].RecordCount / query.pageSize)
                        : 0,
                    uuid: query.uuid,
                    status: query.statusId,
                });
            } else {
                return res.status(404).json({ message: 'Không có dữ liệu!' });
            }
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getAppointmentByType(req: Request, res: Response): Promise<void> {
        try {
            const filterOptions: AppointmentFilterDto =
                req.body as AppointmentFilterDto;
            const result = await this.appointmentService.getAppointmentByType(
                filterOptions.pageIndex,
                filterOptions.pageSize,
                filterOptions.doctorId,
                filterOptions.type,
            );
            if (result) {
                res.json({
                    pageIndex: filterOptions.pageIndex,
                    pageSize: filterOptions.pageSize,
                    totalItems: result[0].RecordCount,
                    data: result,
                    doctorId: filterOptions.doctorId,
                    type: filterOptions.type,
                    pageCount: Math.ceil(
                        result[0].RecordCount / filterOptions.pageSize,
                    ),
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
            const doctorId = Number(req.params.doctorId);
            const data =
                await this.appointmentService.getTotalPatientInDay(doctorId);
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
            const doctorId = Number(req.params.doctorId);
            const data =
                await this.appointmentService.getAppointmentInDay(doctorId);
            if (data) {
                res.json(data);
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
            const doctorId = Number(req.params.doctorId);
            const data =
                await this.appointmentService.getTotalPatientExaminedInDay(
                    doctorId,
                );
            if (data) {
                res.json(data);
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
            const appointment: AppointmentCreateDto =
                req.body as AppointmentCreateDto;
            const result =
                await this.appointmentService.orderAppointment(appointment);
            const io = getSocket();

            io.emit('newAppointment', result);
            if (result) {
                res.json({ message: 'Successfully', result: result });
            }
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
                appointment.statusId,
                appointment.rejectionReason,
            );
            res.status(200).json({ message: 'Successfully!' });
            if (appointment?.rejectionReason) {
                await sendRejection(
                    appointment.patientEmail,
                    appointment.doctorName,
                    appointment.patientName,
                    appointment.startTime + '-' + appointment.endTime,
                    dayjs(appointment.appointmentDate).format('DD-MM-YYYY'),
                    appointment.rejectionReason,
                    requirementObject,
                );
            }
            if (appointment?.status_id === 2) {
                await sendConfirmSuccess(
                    String(appointment.patientName),
                    String(appointment.patientEmail),
                    appointment.doctorName,
                    appointment.startTime + '-' + appointment.endTime,
                    dayjs(appointment.appointmentDate).format('DD-MM-YYYY'),
                    appointment.location,
                    'Đã xác nhận',
                    appointment.price,
                    appointment.serviceName,
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
    async getAppointmentAtInvoice(req: Request, res: Response): Promise<void> {
        try {
            const { patientName, doctorName, patientPhone, appointmentDate } =
                req.body;
            const data = await this.appointmentService.getAppointmentAtInvoice(
                patientName,
                doctorName,
                patientPhone,
                appointmentDate,
            );
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
