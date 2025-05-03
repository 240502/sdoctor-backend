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
    async statisticsAppointmentsByDay(
        startWeek?: Date | null,
        endWeek?: Date | null,
        doctorId?: number | null,
    ) {
        try {
            if (!doctorId || !startWeek || !endWeek) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            // Kiểm tra xem Date có hợp lệ không
            if (isNaN(startWeek.getTime()) || isNaN(endWeek.getTime())) {
                throw new Error('Thời gian không hợp lệ !');
            }

            // Chuyển đổi doctorId sang number
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
        return this.appointmentRepository.getTotalPatientInDay(doctorId);
    }
    async getTotalAppointmentsCompleted(doctorId: number): Promise<any> {
        return this.appointmentRepository.getTotalAppointmentsCompleted(
            doctorId,
        );
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
            console.log('result', result);

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
        return this.appointmentRepository.updateAppointmentStatus(
            id,
            status,
            reason,
        );
    }

    async getAppointmentById(id: number): Promise<any> {
        return this.appointmentRepository.getAppointmentById(id);
    }
    async getAppointmentAtInvoice(
        patientName: string,
        doctorName: string,
        patientPhone: string,
        appointmentDate: Date,
    ): Promise<any> {
        return this.appointmentRepository.getAppointmentAtInvoice(
            patientName,
            doctorName,
            patientPhone,
            appointmentDate,
        );
    }
    async updateIsValuate(appointmentId: number): Promise<any> {
        return this.appointmentRepository.updateIsValuate(appointmentId);
    }
}
