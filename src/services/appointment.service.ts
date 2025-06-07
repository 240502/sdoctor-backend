import { injectable } from 'tsyringe';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { AppointmentCreateDto, AppointmentRes } from '../models';
import { ScheduleRepository } from '../repositories/schedulesRepository';

@injectable()
export class AppointmentService {
    constructor(
        private appointmentRepository: AppointmentRepository,
        private scheduleRepository: ScheduleRepository,
    ) {}
    async getAppointmentsForDoctor(
        doctorId: number,
        status: number,
        appointmentDate: string,
        pageSize: number | null,
        pageIndex: number | null,
    ): Promise<any> {
        try {
            let offset: number = 0;
            if (pageSize && pageIndex) {
                offset = (pageIndex - 1) * pageSize;
            }
            return await this.appointmentRepository.getAppointmentsForDoctor(
                doctorId,
                status,
                appointmentDate,
                pageSize,
                offset,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async getAppointmentsByMonthAndYear(
        fromDate: string,
        toDate: string,
        doctorId: number,
    ): Promise<any> {
        try {
            if (!doctorId || !fromDate || !toDate) {
                throw new Error('Thiếu tham số để lấy dữ liệu!');
            }
            return await this.appointmentRepository.getAppointmentsByMonthAndYear(
                fromDate,
                toDate,
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getTotalAppointmentByStatus(
        doctorId: number,
        appointmentDate: string,
    ): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.appointmentRepository.getTotalAppointmentByStatus(
                doctorId,
                appointmentDate,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getRecentAppointments(
        entityId: number | null,
        limit: number | null,
        withoutId: number | null,
    ): Promise<AppointmentRes[] | null> {
        try {
            if (!entityId || !limit || !withoutId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.appointmentRepository.getRecentAppointments(
                entityId,
                limit,
                withoutId,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async statisticsAppointmentsByDay(
        startWeek?: Date | null,
        endWeek?: Date | null,
        doctorId?: number | null,
    ) {
        try {
            if (!doctorId || !startWeek || !endWeek) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            if (isNaN(startWeek.getTime()) || isNaN(endWeek.getTime())) {
                throw new Error('Thời gian không hợp lệ !');
            }

            if (isNaN(doctorId)) {
                throw new Error('Mã bác sĩ không hợp lệ');
            }

            return await this.appointmentRepository.statisticsAppointmentsByDay(
                startWeek,
                endWeek,
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentsInDay(
        doctorId: number,
    ): Promise<AppointmentRes[] | null> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return await this.appointmentRepository.getAppointmentsInDay(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getWaitingPatientsCount(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu!');
            }
            return await this.appointmentRepository.getWaitingPatientsCount(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentWithOptions(
        pageIndex: number | null,
        pageSize: number | null,
        status: number | null,
        userId: number | null,
        appointmentDate: string | null,
    ) {
        try {
            let offset: number | null = null;
            if (pageIndex && pageSize) {
                offset = (pageIndex - 1) * pageSize;
            }
            return await this.appointmentRepository.getAppointmentWithOptions(
                offset,
                pageSize ?? null,
                status ?? null,
                userId ?? null,
                appointmentDate === 'null' ? null : appointmentDate,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentByUuid(
        uuid: string,
        pageSize: number | null,
        pageIndex: number | null,
        status: number | null,
        fromDate: string,
        toDate: string,
    ): Promise<AppointmentRes[] | null> {
        try {
            if (!uuid) {
                throw new Error('UUID is required');
            }
            let offset: number | null = null;
            if (pageSize && pageIndex) {
                offset = (pageIndex - 1) * pageSize;
                pageSize = Number(pageSize);
            }
            return this.appointmentRepository.getAppointmentByUuid(
                uuid,
                pageSize ?? null,
                offset,
                status ?? null,
                fromDate,
                toDate,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentByType(
        pageIndex: number,
        pageSize: number,
        doctorId: number,
        type: number,
    ): Promise<any> {
        return this.appointmentRepository.getAppointmentByType(
            pageIndex,
            pageSize,
            doctorId,
            type,
        );
    }

    async getTotalPatientInDay(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số !');
            }
            return this.appointmentRepository.getTotalPatientInDay(doctorId);
        } catch (err: any) {
            throw err;
        }
    }
    async getTotalAppointmentsCompleted(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham sô !');
            }
            return this.appointmentRepository.getTotalAppointmentsCompleted(
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async getRevenueByMonth(month: number, year: number): Promise<any> {
        return this.appointmentRepository.getRevenueByMonth(month, year);
    }

    async orderAppointment(appointment: AppointmentCreateDto): Promise<any> {
        try {
            const result =
                await this.appointmentRepository.createAppointment(appointment);
            const updatedScheduleStatusData = [
                { scheduleId: result.scheduleId, status: 'booked' },
            ];
            await this.scheduleRepository.updateScheduleStatus(
                updatedScheduleStatusData,
            );
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateAppointmentStatus(
        id: number,
        status: number,
        reason: string,
    ): Promise<any> {
        try {
            if (!id && !status) {
                throw new Error('Thiếu id và status!');
            }
            return this.appointmentRepository.updateAppointmentStatus(
                id,
                status,
                reason,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async getAppointmentById(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số !');
            }
            return this.appointmentRepository.getAppointmentById(id);
        } catch (err: any) {
            throw err;
        }
    }
    async getAppointmentAtInvoice(
        patientName: string,
        doctorName: string,
        patientPhone: string,
        appointmentDate: Date,
    ): Promise<any> {
        try {
            if (
                !patientName ||
                !doctorName ||
                !appointmentDate ||
                !patientPhone
            ) {
                throw new Error('Thiếu tham số');
            }
            return this.appointmentRepository.getAppointmentAtInvoice(
                patientName,
                doctorName,
                patientPhone,
                appointmentDate,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateIsValuate(appointmentId: number): Promise<any> {
        try {
            if (!appointmentId) {
                throw new Error('Thiếu tham số !');
            }
            return this.appointmentRepository.updateIsValuate(appointmentId);
        } catch (err: any) {
            throw err;
        }
    }
}
