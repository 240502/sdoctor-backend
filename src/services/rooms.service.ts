import { injectable } from 'tsyringe';
import { RoomsRepository } from '../repositories/roomsRepository';

@injectable()
export class RoomsService {
    constructor(private roomsRepository: RoomsRepository) {}

    async getRoomsByClinicAndDepartment(
        clinicId: number,
        departmentId: number,
    ) {
        try {
            if (!clinicId || !departmentId) {
                throw new Error('Thiếu tham số để lấy dữ liệu!');
            }
            return await this.roomsRepository.getRoomsByClinicAndDepartment(
                clinicId,
                departmentId,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
