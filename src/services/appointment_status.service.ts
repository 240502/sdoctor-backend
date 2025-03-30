import { injectable } from 'tsyringe';
import { AppointmentStatusRepository } from '../repositories/appointment_statusRepository';
@injectable()
export class AppointmentStatusService {
    constructor(
        private appointmentStatusRepository: AppointmentStatusRepository,
    ) {}

    async getAllAppointmentStatus(): Promise<any> {
        return this.appointmentStatusRepository.getAllAppointmentStatus();
    }
}
