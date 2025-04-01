import { injectable } from 'tsyringe';
import { DepartmentRepository } from '../repositories/departmentRepository';
import { DepartmentResponse } from '../models/department';

@injectable()
export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

    async getAllDepartments(): Promise<DepartmentResponse[] | null> {
        return await this.departmentRepository.getAllDepartment();
    }
    async getDepartmentById(
        clinicId: number,
    ): Promise<DepartmentResponse[] | null> {
        try {
            if (!clinicId) {
                throw new Error('Cần mã cơ sở y tế để lấy dữ liệu !');
            }
            return await this.departmentRepository.getDepartmentByClinicId(
                clinicId,
            );
        } catch (err: Error | any) {
            throw err;
        }
    }
}
