import { injectable } from 'tsyringe';
import { DoctorRepository } from '../repositories/doctorRepository';
import { Doctor } from '../models/doctor';

@injectable()
export class DoctorService {
    constructor(private doctorRepository: DoctorRepository) {}
    async createDoctor(doctor: Doctor): Promise<any> {
        return this.doctorRepository.createDoctor(doctor);
    }
    async updateDoctor(doctor: Doctor): Promise<any> {
        return this.doctorRepository.updateDoctor(doctor);
    }
    async deleteDoctor(id: Number): Promise<any> {
        return this.doctorRepository.deleteDoctor(id);
    }

    async getDoctorById(id: number): Promise<any> {
        return this.doctorRepository.getDoctorById(id);
    }

    async getDoctorView(
        pageIndex: Number,
        pageSize: Number,
        majorId: Number | null,
        location: String | null,
        clinicId: number | null,
    ): Promise<any> {
        return this.doctorRepository.GetDoctorView(
            pageIndex,
            pageSize,
            majorId,
            location,
            clinicId,
        );
    }
    async getQuantityDoctor(): Promise<any> {
        return this.doctorRepository.getQuantityDoctor();
    }
    async getCommonDoctor(): Promise<any> {
        return this.doctorRepository.getCommonDoctor();
    }
}
