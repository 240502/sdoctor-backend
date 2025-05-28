import { injectable } from 'tsyringe';
import { AppointmentService } from '../services/appointment.service';
import { Request, Response } from 'express';
import { getSocket } from '../socket';

import {
    AppointmentCreateDto,
    AppointmentFilterDto,
} from '../models/appointment';
@injectable()
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}
    async getTotalAppointmentByStatus(req: Request, res: Response): Promise<void|Response>{
        try {
            const doctorId = Number(req.params.doctorId); 
            const result = await this.appointmentService.getTotalAppointmentByStatus(doctorId)
            if (!result) {
                return res.status(404).json({message:"Không có dữ liệu"});

            }
            return res.status(200).json(result);
            
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async getRecentAppointments(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { entityId, limit, withoutId } = req.query;
            let entityIdNumber: number | null = null;
            let limitNumber: number | null = null;
            let withoutIdNumber: number | null = null;
            if (entityId && !isNaN(Number(entityId)))
                entityIdNumber = Number(entityId);
            if (limit && !isNaN(Number(limit))) limitNumber = Number(limit);
            if (withoutId && !isNaN(Number(withoutId)))
                withoutIdNumber = Number(withoutId);
            const results = await this.appointmentService.getRecentAppointments(
                entityIdNumber,
                limitNumber,
                withoutIdNumber,
            );
            return results
                ? res.status(200).json({
                      entityId,
                      appointments: results,
                      limit,
                      withoutId,
                  })
                : res.status(404).json({ message: 'Không có dữ liệu !' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async statisticsAppointmentsByDay(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { startWeek, endWeek, doctorId } = req.query;
            let startDate: Date | null = null;
            let endDate: Date | null = null;
            let doctorIdNumber: number | null = null;
            if (startWeek) {
                startDate = new Date(startWeek.toString());
            }
            if (endWeek) {
                endDate = new Date(endWeek.toString());
            }
            if (doctorId) {
                doctorIdNumber = parseInt(doctorId.toString());
            }

            const results =
                await this.appointmentService.statisticsAppointmentsByDay(
                    startDate,
                    endDate,
                    doctorIdNumber,
                );
            return results
                ? res.status(200).json(results)
                : res.status(404).json({ message: 'Không có dữ liệu !' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAppointmentsInDay(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const doctorId: number = Number(req.params.doctorId);
            const results =
                await this.appointmentService.getAppointmentsInDay(doctorId);
            return results
                ? res.status(200).json(results)
                : res.status(404).json({ message: 'Không có dữ liệu !' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getWaitingPatientsCount(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const doctorId: number = Number(req.params.doctorId);
            const results =
                await this.appointmentService.getWaitingPatientsCount(doctorId);
            return results
                ? res.status(200).json(results)
                : res.status(404).json({ message: 'Không có dữ liệu !' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

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
                fromDate: string;
                toDate: string;
            };
            const results =
                await this.appointmentService.getAppointmentWithOptions(
                    query.pageIndex,
                    query.pageSize,
                    query.status,
                    query.userId,
                    query.fromDate,
                    query.toDate,
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
                fromDate: string;
                toDate: string;
            };

            const data = await this.appointmentService.getAppointmentByUuid(
                query.uuid,
                query.pageSize,
                query.pageIndex,
                query.statusId,
                query.fromDate,
                query.toDate,
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

    async getTotalAppointmentsCompleted(
        req: Request,
        res: Response,
    ): Promise<any> {
        try {
            const doctorId = Number(req.params.doctorId);
            const data =
                await this.appointmentService.getTotalAppointmentsCompleted(
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

    async updateAppointmentStatus(req: Request, res: Response): Promise<void> {
        try {
            const { appointment } = req.body;
            await this.appointmentService.updateAppointmentStatus(
                appointment.id,
                appointment.statusId,
                appointment.rejectionReason,
            );
            res.status(200).json({ message: 'Successfully!' });
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
