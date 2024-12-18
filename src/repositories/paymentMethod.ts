import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { PaymentMethod } from '../models/paymentMethod';
@injectable()
export class PaymentMethodRepository {
    constructor(private db: Database) {}
    async getAllPaymentMethod(): Promise<PaymentMethod[] | null> {
        try {
            const sql = 'CALL GetAllPaymentMethod(@err_code,@err_msg)';
            const [res] = await this.db.query(sql, []);
            if (Array.isArray(res) && res.length > 0) {
                return res;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
