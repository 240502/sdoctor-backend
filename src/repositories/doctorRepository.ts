import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Doctor } from '../models/doctor';
@injectable()
export class DoctorRepository {
    constructor(private db: Database) {}
  
}
