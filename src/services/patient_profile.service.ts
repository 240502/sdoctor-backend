import { injectable } from 'tsyringe';
import { PatientProfile } from '../models/patient_profile';
import { PatientProfileRepository } from '../repositories/patient_profileRepository';

@injectable()
export class PatientProfileService {
    constructor(private patientProfileRepository: PatientProfileRepository) {}
    async getPatientProfiles(
        uuids: string[],
    ): Promise<PatientProfile[] | null> {
        try {
            if (!Array.isArray(uuids) || uuids.length === 0) {
                throw new Error('uuid phải là 1 mảng !');
            }
            const uuidString = uuids.join(',');
            return await this.patientProfileRepository.getPatientProfiles(
                uuidString,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getProfileByPhoneOrEmail(
        searchContent: string,
    ): Promise<PatientProfile | null> {
        return this.patientProfileRepository.getProfileByPhoneOrEmail(
            searchContent,
        );
    }
    async getRecentPatient(): Promise<PatientProfile | null> {
        return this.patientProfileRepository.getRecentPatient();
    }
    async createPatientProfile(profile: PatientProfile): Promise<any> {
        return this.patientProfileRepository.createPatientProfile(profile);
    }
    async updatePatientProfile(profile: PatientProfile): Promise<any> {
        return this.patientProfileRepository.updatePatientProfile(profile);
    }
    async deletePatientProfile(uuid: string): Promise<any> {
        return this.patientProfileRepository.deletePatientProfile(uuid);
    }
    async getPatientProfileByUuid(uuid: string): Promise<any> {
        return this.patientProfileRepository.getPatientProfileByUuid(uuid);
    }
}
