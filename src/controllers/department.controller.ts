import { DepartmentService } from '../services/department.service';
import { injectable } from 'tsyringe';
import { Response, Request } from 'express';

@injectable()
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {}

    async getAllDepartment(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const data = await this.departmentService.getAllDepartments();
            if (!data) {
                return res.status(404).json({ message: 'Không có dữ liệu  !' });
            }
            res.status(200).json(data);
        } catch (err: Error | any) {
            res.status(500).json({ message: err.message });
        }
    }
}
