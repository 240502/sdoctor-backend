import { injectable } from 'tsyringe';
import { RoomRepository } from '../repositories/roomRepository';

@injectable()
export class RoomService {
    constructor(private roomRepository: RoomRepository) {}

    async getRoomsByClinicAndDepartment(
        clinicId: number,
        departmentId: number,
    ) {
        try {
            return await this.roomRepository.getRoomsByClinicAndDepartment(
                Number(clinicId),
                Number(departmentId),
            );
        } catch (err: any) {
            throw err;
        }
    }
}
