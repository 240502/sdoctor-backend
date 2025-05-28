import { injectable } from 'tsyringe';
import { PatientProfile } from '../models/patient_profile';
import { PatientProfileService } from '../services/patient_profile.service';
import { Request, Response } from 'express';

@injectable()
export class PatientProfileController {
    constructor(private patientProfileService: PatientProfileService) {}
    async getPatientProfiles(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { uuids } = req.body as unknown as {
                uuids: string[];
            };
            const results =
                await this.patientProfileService.getPatientProfiles(uuids);
            return results
                ? res.status(200).json(results)
                : res.status(404).json({ message: 'Không có dữ liệu hồ sơ !' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async getProfileByPhoneOrEmail(req: Request, res: Response): Promise<void> {
        try {
            const { searchContent } = req.body;
            const profile: PatientProfile | null =
                await this.patientProfileService.getProfileByPhoneOrEmail(
                    searchContent,
                );
            if (profile) {
                res.json(profile);
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getRecentPatient(req: Request, res: Response): Promise<void> {
        try {
            const patient = await this.patientProfileService.getRecentPatient();
            if (patient) {
                res.json(patient);
            } else res.status(404);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async createPatientProfile(req: Request, res: Response): Promise<any> {
        try {
            const profile: PatientProfile = req.body as PatientProfile;
            const recentPatient: PatientProfile | null =
                await this.patientProfileService.getRecentPatient();
            if (recentPatient) {
                const recentPatientId = recentPatient.id;
                const recentPatientIdNumber = Number(
                    recentPatientId.slice(1, recentPatient.id.length),
                );
                const newPatientIdNumber = recentPatientIdNumber + 1;
                let newPatientId = newPatientIdNumber.toString();
                if (newPatientId.length < 3) {
                    for (let i = 0; i <= 3 - newPatientId.length; i++) {
                        newPatientId = '0' + newPatientId;
                    }
                }
                newPatientId = 'P' + newPatientId;
                const newProfile = { ...profile, id: newPatientId };

                const results =
                    await this.patientProfileService.createPatientProfile(
                        newProfile,
                    );
                return res.json({ message: 'Created successfully', results });
            } else {
                const newProfile = { ...profile, id: 'P001' };
                const results =
                    await this.patientProfileService.createPatientProfile(
                        newProfile,
                    );
                return res.json({ message: 'Created successfully', results });
            }
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
