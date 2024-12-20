import { injectable } from 'tsyringe';
import { AppointmentRepository } from '../repositories/appointmentRepository';
import { Appointment } from '../models/appointment';

@injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}
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
    async getAppointmentInDay(doctorId: number): Promise<any> {
        return this.appointmentRepository.getAppointmentInDay(doctorId);
    }
    async getTotalPatientInDay(doctorId: number): Promise<any> {
        return this.appointmentRepository.getTotalPatientInDay(doctorId);
    }
    async getTotalPatientExaminedInDay(doctorId: number): Promise<any> {
        return this.appointmentRepository.getTotalPatientExaminedInDay(
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
