import { injectable } from 'tsyringe';
import { SupportStaffRepository } from '../repositories/support_staffRepository';
import {
    SupportStaff,
    SupportStaffCreateDTO,
    SupportStaffUpdateDTO,
} from '../models/support_staff';

@injectable()
export class SupportStaffService {
    constructor(private supportStaffRepository: SupportStaffRepository) {}

    async getSupportStaffById(
        employeeId: string,
    ): Promise<SupportStaff | null> {
        try {
            if (!employeeId) {
                throw new Error('Thiếu tham số !');
            }
            return await this.supportStaffRepository.getSupportStaffById(
                employeeId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getSupportStaffs(
        pageIndex: number | null,
        pageSize: number | null,
        searchContent: string,
    ): Promise<SupportStaff[] | null> {
        try {
            let offset: number | null = null;
            if (pageIndex && pageSize) {
                offset = (pageIndex - 1) * pageSize;
            }
            return await this.supportStaffRepository.getSupportStaffs(
                pageSize,
                isNaN(Number(offset)) ? null : offset,
                typeof searchContent === 'string' && searchContent === 'null'
                    ? null
                    : searchContent,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async createSupportStaff(
        supportStaff: SupportStaffCreateDTO,
    ): Promise<any> {
        try {
            if (!supportStaff.supporterId || !supportStaff.fullName) {
                throw new Error('Thiếu tham số để thêm dữ liệu!');
            }
            return this.supportStaffRepository.createSupportStaff(supportStaff);
        } catch (err: any) {
            throw err;
        }
    }

    async updateSupportStaff(
        supportStaff: SupportStaffUpdateDTO,
    ): Promise<any> {
        try {
            if (
                !supportStaff.supporterId ||
                !supportStaff.fullName ||
                !supportStaff.employeeId
            ) {
                throw new Error('Thiếu tham số để cập nhật dữ liệu!');
            }
            return this.supportStaffRepository.updateSupportStaff(supportStaff);
        } catch (err: any) {
            throw err;
        }
    }
    async deleteSupportStaff(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu tham số để xóa!');
            }
            return this.supportStaffRepository.deleteSupportStaff(id);
        } catch (err: any) {
            throw err;
        }
    }
}
