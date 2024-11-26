import { injectable } from 'tsyringe';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { Appointment } from '../models/appointment';

@injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}
    async getAppointmentInDay(
        pageIndex: number,
        pageSize: number,
        doctorId: number,
    ): Promise<any> {
        return this.appointmentRepository.getAppointmentInDay(
            pageIndex,
            pageSize,
            doctorId,
        );
    }
    async getTotalPatientInDay(id: number): Promise<any> {
        return this.appointmentRepository.getTotalPatientInDay(id);
    }
    async getTotalPatientExaminedInDay(id: number): Promise<any> {
        return this.appointmentRepository.getTotalPatientExaminedInDay(id);
    }

    async getTotalPriceAppointmentByWeek(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ): Promise<any> {
        return this.appointmentRepository.getTotalPriceAppointmentByWeek(
            startWeek,
            endWeek,
            doctorId,
        );
    }
    async getTotalAppointmentByWeek(
        startWeek: Date,
        endWeek: Date,
        doctorId: number,
    ): Promise<any> {
        return this.appointmentRepository.getTotalAppointmentByWeek(
            startWeek,
            endWeek,
            doctorId,
        );
    }
    async getRecentPatientExamined(): Promise<any> {
        return this.appointmentRepository.getRecentPatientExamined();
    }
    async getRecentPatientOrdered(): Promise<any> {
        return this.appointmentRepository.getRecentPatientOrdered();
    }

    async getRevenueByMonth(month: number, year: number): Promise<any> {
        return this.appointmentRepository.getRevenueByMonth(month, year);
    }

    async getAllAppointmentByYearAndMonth(
        year: number,
        month: number,
    ): Promise<any> {
        return this.appointmentRepository.getAllAppointmentByYearAndMonth(
            year,
            month,
        );
    }

    async getQuantityRejectedAppointmentByYearAndMonth(
        year: number,
        month: number,
    ): Promise<any> {
        return this.appointmentRepository.getQuantityRejectedAppointmentByYearAndMonth(
            year,
            month,
        );
    }
    async orderAppointment(appointment: Appointment): Promise<any> {
        return this.appointmentRepository.createAppointment(appointment);
    }
    async ViewAppointment(
        pageIndex: number,
        pageSize: number,
        phone: string,
        statusId: number,
    ): Promise<any> {
        return this.appointmentRepository.ViewAppointment(
            pageIndex,
            pageSize,
            phone,
            statusId,
        );
    }
    async cancelAppointment(id: number, reason: string): Promise<any> {
        return this.appointmentRepository.cancelAppointment(id, reason);
    }
    async getAppointmentById(id: number): Promise<any> {
        return this.appointmentRepository.getAppointmentById(id);
    }

    async confirmAppointment(id: number): Promise<any> {
        return this.appointmentRepository.confirmAppointment(id);
    }
}
