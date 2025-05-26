import { injectable } from 'tsyringe';
import { DoctorServiceRepository } from '../repositories/doctorServiceRepository';
import {
    DoctorService,
    DoctorServiceCreateDTO,
    DoctorServiceUpdateDTO,
} from '../models/doctor_service';

@injectable()
export class DoctorServiceService {
    constructor(private doctorServiceRepository: DoctorServiceRepository) {}

    async createDoctorService(
        doctorService: DoctorServiceCreateDTO,
    ): Promise<any> {
        try {
            if (!doctorService.doctorId || !doctorService.serviceId) {
                throw new Error('Doctor ID and Service ID are required.');
            }
            return this.doctorServiceRepository.createDoctorService(
                doctorService,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async updateDoctorService(
        doctorService: DoctorServiceUpdateDTO,
    ): Promise<any> {
        try {
            if (!doctorService.customPrice || !doctorService.serviceId) {
                throw new Error('Service ID and price are required.');
            }
            return this.doctorServiceRepository.updateDoctorService(
                doctorService,
            );
        } catch (err: any) {
            throw err;
        }
    }

    async deleteDoctorService(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('ID is required.');
            }
            return this.doctorServiceRepository.deleteDoctorService(id);
        } catch (err: any) {
            throw err;
        }
    }
    async getDoctorServices(doctorId: number): Promise<DoctorService[] | null> {
        try {
            if (!doctorId) {
                throw new Error('Doctor ID is required.');
            }
            return this.doctorServiceRepository.getDoctorServices(doctorId);
        } catch (err: any) {
            throw err;
        }
    }
}
