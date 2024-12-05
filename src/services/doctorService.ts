import { injectable } from 'tsyringe';
import { DoctorRepository } from '../repositories/doctorRepository';
import { Doctor, DoctorInfo } from '../models/doctor';

@injectable()
export class DoctorService {
    constructor(private doctorRepository: DoctorRepository) {}
    async createDoctor(doctor: DoctorInfo): Promise<any> {
        return this.doctorRepository.createDoctor(doctor);
    }
    async updateDoctor(doctor: DoctorInfo): Promise<any> {
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
        name: string | null,
        clinicId: number | null,
    ): Promise<any> {
        return this.doctorRepository.GetDoctorView(
            pageIndex,
            pageSize,
            majorId,
            name,
            clinicId,
        );
    }
    async getQuantityDoctor(): Promise<any> {
        return this.doctorRepository.getQuantityDoctor();
    }
    async getCommonDoctor(): Promise<any> {
        return this.doctorRepository.getCommonDoctor();
    }
    async updateViewsDoctor(id: number): Promise<any> {
        return this.doctorRepository.updateViewDoctor(id);
    }
}
