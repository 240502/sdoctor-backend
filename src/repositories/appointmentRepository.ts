import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Appointment } from '../models/appointment';
@injectable()
export class AppointmentRepository {
    constructor(private db: Database) {}
  
}
