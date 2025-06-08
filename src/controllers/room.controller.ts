import { injectable } from 'tsyringe';
import { RoomService } from '../services/room.service';
import { Request, Response } from 'express';

@injectable()
export class RoomController {
    constructor(private roomService: RoomService) {}

    async getRoomsByClinicAndDepartment(req: Request, res: Response) {
        try {
            const { clinicId, departmentId } = req.query as unknown as {
                clinicId: number;
                departmentId: number;
            };
            const results =
                await this.roomService.getRoomsByClinicAndDepartment(
                    clinicId,
                    departmentId,
                );
            if (!results) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.status(200).json(results);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
