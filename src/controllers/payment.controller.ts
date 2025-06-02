import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import axios from 'axios';
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs');
import { InvoicesService } from '../services/invoices.service';
import { Invoices } from '../models/invoices';
import {
    HashAlgorithm,
    ProductCode,
    VNPay,
    VnpLocale,
    dateFormat,
    ignoreLogger,
} from 'vnpay';
import { MailerService } from '../services/mailer.service';
import { AppointmentService } from '../services/appointment.service';
const config: any = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};
@injectable()
export class PaymentController {
    constructor(
        private invoiceService: InvoicesService,
        private mailService: MailerService,
        private appointmentService: AppointmentService,
    ) {}
    async createPayment(req: Request, res: Response): Promise<any> {
        try {
            const appointmentId: number = Number(req.params.appointmentId);
            if (!appointmentId) {
                throw new Error('Thiếu thông tin để tạo đơn hàng !');
            }
            const invoice: Invoices | null =
                await this.invoiceService.getInvoiceByAppointmentId(
                    appointmentId,
                );

            if (!invoice) {
                throw new Error('Không có dữ liệu hóa đơn !');
            }
            const embed_data = {
                // merchantinfo: 'embeddata123',
                //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
                redirecturl:
                    'http://localhost:5173/booking-success?appointment=' +
                    appointmentId,
            };

            const items = invoice;
            const transID = Math.floor(Math.random() * 1000000);

            const order = {
                app_id: config.app_id,
                // apptransid: '200000',
                app_trans_id: `${dayjs().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
                app_user: 'user123',
                app_time: Date.now(), // miliseconds
                item: JSON.stringify([items]),
                embed_data: JSON.stringify(embed_data),
                amount: invoice?.amount,
                //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
                //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
                callback_url:
                    'https://b6ff-14-244-119-216.ngrok-free.app/api/payment/callback',
                description: `Thanh toán phí hẹn khám`,
                bank_code: 'zalopayapp',
                mac: '',
            };

            // appid|app_trans_id|appuser|amount|apptime|embeddata|item
            const data =
                config.app_id +
                '|' +
                order.app_trans_id +
                '|' +
                order.app_user +
                '|' +
                order.amount +
                '|' +
                order.app_time +
                '|' +
                order.embed_data +
                '|' +
                order.item;
            order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            const result = await axios.post(config.endpoint, null, {
                params: order,
            });
            res.status(200).json(result.data);
        } catch (err: any) {
            res.status(500).json({ error: err });
        }
    }
    async callBack(req: Request, res: Response): Promise<any> {
        let result: any = {};
        const items = JSON.parse(req.body.data).item;

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            console.log('mac =', mac);

            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (reqMac !== mac) {
                // callback không hợp lệ
                result.return_code = -1;
                result.return_message = 'mac not equal';
            } else {
                // thanh toán thành công
                // merchant cập nhật trạng thái cho đơn hàng ở đây
                let dataJson = JSON.parse(dataStr, config?.key2);
                console.log(
                    "update order's status = success where app_trans_id =",
                    dataJson['app_trans_id'],
                );

                await this.invoiceService.updateInvoiceStatus(
                    JSON.parse(items)[0].id,
                    'Đã thanh toán',
                );

                result.return_code = 1;
                result.return_message = 'success';
            }
        } catch (ex: any) {
            console.log('lỗi:::' + ex.message);
            result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
            result.return_message = ex.message;
        }

        // thông báo kết quả cho ZaloPay server
        res.json(result);
    }

    async createPaymentVnPay(req: Request, res: Response): Promise<any> {
        try {
            const appointmentId: number = Number(req.params.appointmentId);
            if (!appointmentId) {
                throw new Error('Thiếu thông tin để tạo đơn hàng !');
            }
            const invoice: Invoices | null =
                await this.invoiceService.getInvoiceByAppointmentId(
                    appointmentId,
                );

            if (!invoice) {
                throw new Error('Không có dữ liệu hóa đơn !');
            }
            const vnpay = new VNPay({
                tmnCode: 'PIGNCXT4',
                secureSecret: '2GXHP71JZA295D7B26C9TIPRTNUFL72H',
                vnpayHost: 'https://sandbox.vnpayment.vn',
                queryDrAndRefundHost: 'https://sandbox.vnpayment.vn',
                // Cấu hình tùy chọn
                testMode: true, // Chế độ test
                hashAlgorithm: HashAlgorithm.SHA512,
                enableLog: true, // Bật/tắt ghi log
                loggerFn: ignoreLogger, // Hàm xử lý log tùy chỉnh
            });
            const now = new Date();
            now.setMinutes(now.getMinutes() + 2);
            const vnpayResponse = await vnpay.buildPaymentUrl({
                vnp_Amount: invoice.amount,
                vnp_IpAddr: '127.0.0.1',
                vnp_TxnRef: `#IV${invoice.id}`,
                vnp_OrderInfo: `Thanh toán cho hóa đơn ${invoice.id.toString()}`,
                vnp_OrderType: ProductCode.Other,
                vnp_ReturnUrl: `http://localhost:400/api/payment/vnpay/check-payment?appointmentId=${appointmentId}`,
                vnp_Locale: VnpLocale.VN,
                vnp_CreateDate: dateFormat(new Date()),
                vnp_ExpireDate: dateFormat(now),
            });
            res.status(200).json(vnpayResponse);
            return;
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async checkPaymentVnpay(req: Request, res: Response): Promise<any> {
        try {
            console.log(req.query);
            const {
                vnp_ResponseCode,
                vnp_OrderInfo,
                vnp_BankTranNo,
                vnp_TxnRef,
                appointmentId,
            } = req.query as unknown as {
                vnp_ResponseCode: string;
                vnp_OrderInfo: string;
                vnp_TxnRef: string;
                appointmentId: string;
                vnp_BankTranNo: string;
            };
            if (vnp_ResponseCode === '00') {
                const invoiceId = vnp_TxnRef.slice(3, vnp_TxnRef.length);
                await this.invoiceService.updateInvoiceStatus(
                    Number(invoiceId),
                    'Đã thanh toán',
                );
                const appointment =
                    await this.appointmentService.getAppointmentById(
                        Number(appointmentId),
                    );
                await this.mailService.sendPaymentSuccessMail(
                    appointment.patientEmail,
                    appointment.patientName,
                    appointment.doctorName,
                    appointment.appointmentDate,
                    appointment.amount,
                    vnp_BankTranNo,
                );
                res.redirect(
                    `http://localhost:5173/booking-success?appointment=${
                        appointmentId
                    }`,
                );
                return;
            }
            if (vnp_ResponseCode === '24')
                res.redirect(
                    `http://localhost:5173/booking-success?appointment=${
                        appointmentId
                    }`,
                );

            if (vnp_ResponseCode === '15') {
                res.redirect(
                    `http://localhost:5173/booking-success?appointment=${
                        appointmentId
                    }`,
                );
            }
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
