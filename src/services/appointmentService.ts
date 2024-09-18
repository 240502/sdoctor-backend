import { injectable } from 'tsyringe';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { Appointment } from '../models/appointment';

@injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}
    async getRevenueByMonth(month: number, year: number): Promise<any> {
        return this.appointmentRepository.getRevenueByMonth(month, year);
    }
    async getNumberAppointmentInDay(date: Date): Promise<any> {
        return this.appointmentRepository.getNumberAppointmentInDay(date);
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
    async cancelAppointment(id: number): Promise<any> {
        return this.appointmentRepository.cancelAppointment(id);
    }
    async getAppointmentById(id: number): Promise<any> {
        return this.appointmentRepository.getAppointmentById(id);
    }

    async confirmAppointment(id: number): Promise<any> {
        return this.appointmentRepository.confirmAppointment(id);
    }
}
