import { injectable } from 'tsyringe';
import { PaymentMethodService } from '../services/payment_method.service';
import { Request, Response } from 'express';
@injectable()
export class PaymentMethodController {
    constructor(private paymentMethodService: PaymentMethodService) {}
    async getAllPaymentMethod(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.paymentMethodService.getAllPaymentMethod();
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
