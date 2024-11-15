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
            const phone = req.params.phone;
            await this.patientProfileService.deletePatientProfile(phone);
            res.json({ message: 'Deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
