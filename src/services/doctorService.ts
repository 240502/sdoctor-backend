import { injectable } from 'tsyringe';
import { DoctorRepository } from '../repositories/doctorRepository';
import { Doctor, DoctorInfo } from '../models/doctor';

@injectable()
export class DoctorService {
    constructor(private doctorRepository: DoctorRepository) {}

    async getDoctorByUserId(userId: number): Promise<any> {
        return this.doctorRepository.getDoctorByUserId(userId);
    }

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
    async viewDoctorWithPagination(
        pageIndex: Number,
        pageSize: Number,
        majorId: Number | null,
        name: string | null,
        clinicId: number | null,
    ): Promise<any> {
        return this.doctorRepository.viewDoctorWithPagination(
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
    async getCommonDoctor(pageIndex: number, pageSize: number): Promise<any> {
        return this.doctorRepository.getCommonDoctor(pageIndex, pageSize);
    }
    async updateViewsDoctor(id: number): Promise<any> {
        return this.doctorRepository.updateViewDoctor(id);
    }
    async updateAvgDoctorStar(doctorId: number): Promise<any> {
        return this.doctorRepository.updateAverageDoctorStar(doctorId);
    }
}
