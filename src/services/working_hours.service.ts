import { injectable } from 'tsyringe';
import { WorkingHours, WorkingHoursCreateDto } from '../models/working_hours';
import { WorkingHoursRepository } from '../repositories/working_hoursRepository';

@injectable()
export class WorkingHoursService {
    constructor(private workingHoursRepository: WorkingHoursRepository) {}

    async createWorkingHours(workingHours: WorkingHoursCreateDto) {
        try {
            if (!workingHours.clinicId) {
                throw new Error('Thiếu mã cơ sở y tế!');
            }
            if (!workingHours.dayOfWeek) {
                throw new Error('Thiếu ngày làm việc');
            }

            return await this.workingHoursRepository.createWorkingHours(
                workingHours,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateWorkingHours(workingHours: WorkingHours): Promise<any> {
        try {
            if (!workingHours.id) {
                throw new Error('Thiếu id');
            }

            const result =
                await this.workingHoursRepository.updateWorkingHours(
                    workingHours,
                );
            return result;
        } catch (err: any) {
            throw err;
        }
    }
    async deleteWorkingHours(id: number): Promise<any> {
        try {
            // Input validation
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('id phải là số nguyên dương');
            }

            // Call repository to delete record
            const result =
                await this.workingHoursRepository.deleteWorkingHours(id);
            return result;
        } catch (err: any) {
            throw new Error(`Không thể xóa clinicSpecialty: ${err.message}`);
        }
    }

    async getWorkingHoursByClinicId(clinicId: number): Promise<any> {
        try {
            if (!Number.isInteger(clinicId) || clinicId <= 0) {
                throw new Error('clinicId phải là số nguyên dương');
            }

            const result =
                await this.workingHoursRepository.getWorkingHoursByClinicId(
                    clinicId,
                );
                const dayOrder: { [key: string]: number } = {
                    'Thứ Hai': 1,
                    'Thứ Ba': 2,
                    'Thứ Tư': 3,
                    'Thứ Năm': 4,
                    'Thứ Sáu': 5,
                    'Thứ Bảy': 6,
                    'Chủ Nhật': 7,
                };
        
                // Sắp xếp result theo dayOfWeek
                const sortedResult = result?.sort((a: any, b: any) => {
                    return dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek];
                });
        
                return sortedResult;
        } catch (err: any) {
            throw new Error(
                `Không thể lấy danh sách clinicSpecialty: ${err.message}`,
            );
        }
    }
}
