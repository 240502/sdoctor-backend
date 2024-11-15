import { injectable } from 'tsyringe';
import { PatientProfile } from '../models/patient_profile';
import { PatientProfileRepository } from '../repositories/patient_profileRepository';

@injectable()
export class PatientProfileService {
    constructor(private patientProfileRepository: PatientProfileRepository) {}
    async createPatientProfile(profile: PatientProfile): Promise<any> {
        return this.patientProfileRepository.createPatientProfile(profile);
    }
    async updatePatientProfile(profile: PatientProfile): Promise<any> {
        return this.patientProfileRepository.updatePatientProfile(profile);
    }
    async deletePatientProfile(id: number): Promise<any> {
        return this.patientProfileRepository.deletePatientProfile(id);
    }
}
