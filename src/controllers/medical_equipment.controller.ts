import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { MedicalEquipmentService } from '../services/medical_equipment.service';
import { MedicalEquipmentCreateDto } from '../models/medical_equipment';
@injectable()
export class MedicalEquipmentController {
    constructor(private medicalEquipmentService: MedicalEquipmentService) {}

    async createMedicalEquipment(req: Request, res: Response): Promise<any> {
        try {
            const medicalEquipment: MedicalEquipmentCreateDto =
                req.body as MedicalEquipmentCreateDto;
            const result =
                await this.medicalEquipmentService.createMedicalEquipment(
                    medicalEquipment,
                );
            res.status(201).json({ message: 'Created successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
