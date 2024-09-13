import { injectable } from 'tsyringe';
import { Database } from '../config/database';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
  
}
