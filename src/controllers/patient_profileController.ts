import { injectable } from 'tsyringe';
import { PatientProfile } from '../models/patient_profile';
import { PatientProfileService } from '../services/patient_profileService';
import { Request, Response } from 'express';
import { captureRejectionSymbol } from 'events';

@injectable()
export class PatientProfileController {
    constructor(private patientProfileService: PatientProfileService) {}

    async createPatientProfile(req: Request, res: Response): Promise<void> {
        try {
            const profile: PatientProfile = req.body as PatientProfile;
            await this.patientProfileService.createPatientProfile(profile);
            res.json({ message: 'Created successfully' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updatePatientProfile(req: Request, res: Response): Promise<void> {
        try {
            const profile: PatientProfile = req.body as PatientProfile;
            await this.patientProfileService.updatePatientProfile(profile);
            res.json({ message: 'Updated successfully' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async deletePatientProfile(req: Request, res: Response): Promise<void> {
        try {
            const uuid = req.params.uuid;
            await this.patientProfileService.deletePatientProfile(uuid);
            res.json({ message: 'Deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getPatientProfileByUuid(req: Request, res: Response): Promise<void> {
        try {
            const uuid = req.params.uuid;
            const profile: PatientProfile =
                await this.patientProfileService.getPatientProfileByUuid(uuid);
            if (profile) {
                res.json(profile);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
