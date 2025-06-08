import { Router } from 'express';
import { container } from 'tsyringe';
import { RoomController } from '../controllers/room.controller';
const roomRouter = Router();
const roomController = container.resolve(RoomController);

roomRouter.get(
    '/get-room-by-clinicId-and-departmentId',
    roomController.getRoomsByClinicAndDepartment.bind(roomController),
);

export default roomRouter;
