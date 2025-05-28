import { DepartmentService } from '../services/department.service';
import { injectable } from 'tsyringe';
import { Response, Request } from 'express';

@injectable()
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {}
    async getDepartmentWithPagination(req: Request, res: Response) {
        try {
            const { pageIndex, pageSize, name } = req.query as unknown as {
                pageIndex: number;
                pageSize: number;
                name: string;
            }
            const results = await this.departmentService.getDepartmentsWithPagination(pageIndex, pageSize, name);
            if (!results) {
                return  res.status(404).json({message:"Not found",results:[]})
            }
            res.status(200).json({
                pageCount: Math.ceil(results[0].RecordCount / pageSize),
                data: results,
                pageIndex: pageIndex,
                pageSize: pageSize,
                name:name
            })

        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
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
    async getDepartmentByClinicId(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const clinicId: number = Number(req.params.clinicId);
            const results =
                await this.departmentService.getDepartmentById(clinicId);
            if (!results) {
                return res.status(404).json({ message: 'Không có dữ liệu !' });
            }
            res.status(200).json(results);
        } catch (err: Error | any) {
            res.status(500).json({ message: err.message });
        }
    }
}
