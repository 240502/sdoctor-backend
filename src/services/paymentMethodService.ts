import { injectable } from 'tsyringe';
import { PaymentMethod } from '../models/paymentMethod';
import { PaymentMethodRepository } from '../repositories/paymentMethod';

@injectable()
export class PaymentMethodService {
    constructor(private paymentMethodRepository: PaymentMethodRepository) {}
    async getAllPaymentMethod(): Promise<PaymentMethod[] | null> {
        return this.paymentMethodRepository.getAllPaymentMethod();
    }
}
