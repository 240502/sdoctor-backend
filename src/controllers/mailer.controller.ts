import { MailerService } from '../services/mailer.service';
import { injectable } from 'tsyringe';
import { Response, Request } from 'express';
@injectable()
export class MailerController {
    constructor(private memailerService: MailerService) {}

    async sendBookingSuccess(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const {
                patientName,
                email,
                doctorName,
                time,
                date,
                location,
                status,
                fee,
                serviceName,
            } = req.body;
            const result = await this.memailerService.sendBookingSucces(
                patientName,
                email,
                doctorName,
                time,
                date,
                location,
                status,
                fee,
                serviceName,
            );
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
