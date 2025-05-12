import { injectable } from 'tsyringe';
import { DoctorRepository } from '../repositories/doctorRepository';
import { Doctor, DoctorCreateDto, DoctorInfo } from '../models/doctor';

@injectable()
export class DoctorService {
    constructor(private doctorRepository: DoctorRepository) {}

    async getDoctorByUserId(userId: number): Promise<any> {
        try {
            if (!userId) {
                throw new Error('Thiếu tham số để lấy dữ liệu !');
            }
            return this.doctorRepository.getDoctorByUserId(userId);
        } catch (err: any) {
            throw err;
        }
    }

    async createDoctor(doctor: DoctorCreateDto): Promise<any> {
        try {
            if (
                !doctor.fullName ||
                !doctor.phone ||
                !doctor.department ||
                !doctor.clinicId
            ) {
                throw new Error('Thiếu thông tin để thêm dữ liêu !');
            }
            return this.doctorRepository.createDoctor(doctor);
        } catch (err: any) {
            throw err;
        }
    }
    async updateDoctor(doctor: DoctorInfo): Promise<any> {
        try {
            return this.doctorRepository.updateDoctor(doctor);
        } catch (err) {
            throw err;
        }
    }
    async deleteDoctor(id: Number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số !');
            }
            return this.doctorRepository.deleteDoctor(id);
        } catch (err: any) {
            throw err;
        }
    }

    async getDoctorById(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số !');
            }
            return this.doctorRepository.getDoctorById(id);
        } catch (err: any) {
            throw err;
        }
    }
    async getListDoctorsWithPaginationAndFilters(
        pageIndex: number | null,
        pageSize: number | null,
        majorIds: number[] | null,
        clinicId: number | null,
        doctorServiceIds: number[] | null,
        doctorTitles: number[] | null,
        startPrice: number | null,
        endPrice: number | null,
        departmentId: number | null,
        gender: string | null,
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

        if (doctorTitles && doctorTitles?.length > 0) {
            doctorTilesString = doctorTitles?.join(',');
        }

        return this.doctorRepository.getListDoctorsWithPaginationAndFilters(
            pageIndex ?? null,
            pageSize ?? null,
            majorIdsString,
            clinicId ?? null,
            doctorServiceIdsString,
            doctorTilesString,
            startPrice ?? null,
            endPrice ?? null,
            departmentId ?? null,
            gender ?? null,
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
        try {
            return this.doctorRepository.getCommonDoctor(
                pageIndex ?? null,
                pageSize ?? null,
                withoutId ?? null,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateViewsDoctor(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để cập nhật dữ liệu !');
            }
            return this.doctorRepository.updateViewDoctor(id);
        } catch (err: any) {
            throw err;
        }
    }
    async updateAvgDoctorStar(doctorId: number): Promise<any> {
        try {
            if (!doctorId) {
                throw new Error('Thiếu tham số !');
            }
            return this.doctorRepository.updateAverageDoctorStar(doctorId);
        } catch (err: any) {
            throw err;
        }
    }
}
