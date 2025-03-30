import { injectable } from 'tsyringe';
import { DepartmentRepository } from '../repositories/departmentRepository';
import { DepartmentResponse } from '../models/department';

@injectable()
export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

    async getAllDepartments(): Promise<DepartmentResponse[] | null> {
        return await this.departmentRepository.getAllDepartment();
    }
}
