import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Clinic } from '../models/clinic';
@injectable()
export class ClinicRepository {
    constructor(private db: Database) {}
  
}
