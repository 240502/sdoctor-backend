import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import axios from 'axios';
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs');
import { InvoicesService } from '../services/invoicesService';
import { Invoices } from '../models/invoices';

const config: any = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

@injectable()
export class PaymentController {
    constructor(private invoiceService: InvoicesService) {}
    async createPayment(req: Request, res: Response): Promise<any> {
        try {
            const invoice: Invoices = req.body as Invoices;
            const embed_data = {
                //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
                redirecturl: 'http://localhost:5173/patient/appointment',
            };

            const items = [invoice];
            const transID = Math.floor(Math.random() * 1000000);
            const order = {
                app_id: config.app_id,
                apptransid: '200000',
                app_trans_id: `${dayjs().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
                app_user: 'user123',
                app_time: Date.now(), // miliseconds
                item: JSON.stringify(items),
                embed_data: JSON.stringify(embed_data),
                amount: invoice.amount,
                //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
                //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
                callback_url:
                    'https://efce-14-247-77-136.ngrok-free.app/api/payment/callback',
                description: `Thanh toán phí hẹn khám`,
                bank_code: '',
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
        console.log(JSON.parse(items)[0].id);

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
                let dataJson = JSON.parse(dataStr, config.key2);
                console.log(
                    "update order's status = success where app_trans_id =",
                    dataJson['app_trans_id'],
                );
                this.invoiceService.updateInvoiceStatus(
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
}
