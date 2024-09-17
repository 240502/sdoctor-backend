import { injectable } from 'tsyringe';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { Appointment } from '../models/appointment';

@injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}
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
    async viewDetailAppointmentForPatient(
        pageIndex: number,
        pageSize: number,
        phone: string,
        statusId: number,
    ): Promise<any> {
        return this.appointmentRepository.ViewDetailAppointmentForPatient(
            pageIndex,
            pageSize,
            phone,
            statusId,
        );
    }
    async cancelAppointment(id: number): Promise<any> {
        return this.appointmentRepository.cancelAppointment(id);
    }
}
