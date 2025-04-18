const nodemailer = require('nodemailer');
import { injectable } from 'tsyringe';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanghip200@gmail.com',
        pass: 'vnwp rrvp pvjn rcij',
    },
});

@injectable()
export class MailerService {
    async sendBookingSucces(
        patientName: string,
        email: string,
        doctorName: string,
        time: string,
        date: string,
        location: string,
        status: string,
        fee: number,
        serviceName: string,
    ): Promise<any> {
        try {
            const res = await transporter.sendMail({
                from: 'sanghip200@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Xác nhận lịch hẹn', // Subject line
                text: 'Cảm ơn bạn đã tin tưởng đặt lịch hẹn ở hệ thống của chúng tôi!', // plain text body
                html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Xác nhận lịch hẹn</h2>
                    <p>Kính gửi <strong>${patientName}</strong>,</p>
                    <p>Chúng tôi xin thông báo rằng lịch hẹn của quý khách đã đặt lịch hẹn thành công thông tin chi tiết như sau:</p>
                    <ul>
                        <li><strong>Bác sĩ:</strong>${doctorName}</li>
                        <li><strong>Ngày hẹn:</strong> ${date.slice(0, 10)}</li>
                        <li><strong>Thời gian:</strong> ${time}</li>
                        <li><strong>Địa điểm:</strong>${location}</li>
                        <li><strong>Dịch vụ:</strong> ${serviceName}</li>
                        <li><strong>Phí khám:</strong> ${fee.toLocaleString(undefined)}</li>
                        <li><strong>Trạng thái:</strong> ${status}</li>
                       
                    </ul>
                    <p>Nếu quý khách có bất kỳ thắc mắc nào hoặc cần thay đổi lịch hẹn, vui lòng liên hệ với chúng tôi qua số <strong>0777435783</strong> hoặc email <strong>sanghip200@gmail.com</strong>.</p>
                    <p>Chúng tôi rất mong được phục vụ quý khách và cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi.</p>
                    <p>Trân trọng,</p>
                    <p><strong>SDOCTOR</strong><br>
                </div>
            `,
            });
            console.log('Gửi mail xác nhận đăng ký thành công', res);
        } catch (err: any) {
            console.log(
                'Có lỗi khi gửi mail thông báo đăng ký thành công',
                err,
            );

            throw err;
        }
    }
}
