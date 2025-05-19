import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { MedicalEquipmentService } from '../services/medical_equipment.service';
import {
    MedicalEquipment,
    MedicalEquipmentCreateDto,
} from '../models/medical_equipment';
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
    async updateMedicalEquipment(req: Request, res: Response): Promise<any> {
        try {
            const medicalEquipment: MedicalEquipment =
                req.body as MedicalEquipment;
            const result =
                await this.medicalEquipmentService.updateMedicalEquipment(
                    medicalEquipment,
                );
            res.status(201).json({ message: 'Updated successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async deleteMedicalEquipment(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.medicalEquipmentService.deleteMedicalEquipment(id);
            res.status(201).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async getMedicalEquipmentByClinicId(
        req: Request,
        res: Response,
    ): Promise<any> {
        try {
            const clinicId: number = Number(req.params.clinicId);
            const result =
                await this.medicalEquipmentService.getMedicalEquipmentByClinicId(
                    clinicId,
                );
            if (!result) {
                return res
                    .status(404)
                    .json({ message: 'Not found', result: false });
            }
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
