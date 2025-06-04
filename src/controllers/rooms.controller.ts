import { injectable } from 'tsyringe';
import { RoomsService } from '../services/rooms.service';
import { Request, Response } from 'express';
@injectable()
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    async getRoomsByClinicAndDepartment(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const { clinicId, departmentId } = req.query as unknown as {
                clinicId: number;
                departmentId: number;
            };
            const results =
                await this.roomsService.getRoomsByClinicAndDepartment(
                    clinicId,
                    departmentId,
                );
            if (!results) {
                return res
                    .status(404)
                    .json({ message: 'Not found', result: [] });
            }
            return res.status(200).json(results);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
}
