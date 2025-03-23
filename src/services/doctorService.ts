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
    async getListDoctorsWithPaginationAndFilters(
        pageIndex: number | null,
        pageSize: number | null,
        majorIds: number[] | null,
        clinicId: number | null,
        doctorServiceIds: number[] | null,
        doctorTiles: string[] | null,
        startPrice: number | null,
        endPrice: number | null,
    ): Promise<any> {
        let majorIdsString: string | null = null;
        let doctorServiceIdsString: string | null = null;
        let doctorTilesString: string | null = null;
        if (majorIds && majorIds?.length > 0) {
            majorIdsString = majorIds?.join(',');
        }

        if (doctorServiceIds && doctorServiceIds?.length > 0) {
            doctorServiceIdsString = doctorServiceIds?.join(',');
        }

        if (doctorTiles && doctorTiles?.length > 0) {
            doctorTilesString = doctorTiles?.join(',');
        }

        return this.doctorRepository.getListDoctorsWithPaginationAndFilters(
            pageIndex,
            pageSize ?? null,
            majorIdsString,
            clinicId ? clinicId : null,
            doctorServiceIdsString,
            doctorTilesString,
            startPrice ? startPrice : null,
            endPrice ? endPrice : null,
        );
    }
    async getQuantityDoctor(): Promise<any> {
        return this.doctorRepository.getQuantityDoctor();
    }
    async getCommonDoctor(
        pageIndex: number | null,
        pageSize: number | null,
        withoutId: number | null,
    ): Promise<any> {
        return this.doctorRepository.getCommonDoctor(
            pageIndex,
            pageSize,
            withoutId,
        );
    }
    async updateViewsDoctor(id: number): Promise<any> {
        return this.doctorRepository.updateViewDoctor(id);
    }
    async updateAvgDoctorStar(doctorId: number): Promise<any> {
        return this.doctorRepository.updateAverageDoctorStar(doctorId);
    }
}
