import { html } from 'cheerio';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanghip200@gmail.com',
        pass: 'vnwp rrvp pvjn rcij',
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendConfirm(
    email: string,
    doctorName: string,
    time: string,
    date: string,
    location: string,
    status: string,
    fee: number,
) {
    // send mail with defined transport object
    await transporter.sendMail({
        from: 'sanghip200@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Xác nhận lịch hẹn', // Subject line
        text: 'Cảm ơn bạn đã tin tưởng đặt lịch hẹn ở hệ thống của chúng tôi!', // plain text body
        html: `<h1>Thông tin lịch hẹn</h1><h3>Bác sĩ: ${doctorName}</h3><h3>Thời gian: ${time}</h3> <h3>Ngày hẹn: ${date}</h3> <h3>Địa điểm: ${location}</h3> <h3>Chi phí: ${fee.toLocaleString(undefined)}</h3><h3>Trạng thái:${status}</h3> </h3>`,
    }),
        (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log('oke');
            }
        };

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
export const sendRejection = async (
    email: string,
    doctorName: string,
    patientName: string,
    time: string,
    date: string,
    rejectionReason: string,
    requirementObject: string,
) => {
    try {
        await transporter.sendMail({
            from: 'sanghip200@gmail.com',
            to: email,
            subject: 'Thông báo hủy hẹn',
            html: `<div>
                    Kính gửi ${patientName}
                    <br>
                    Chúng tôi xin chân thành cảm ơn Quý khách đã tin tưởng và lựa chọn dịch vụ tại SDOCTOR
                    <br>Theo yêu cầu từ ${requirementObject.toLocaleLowerCase() === 'bác sĩ' ? 'Bác sĩ' : 'Quý khách hàng'} và vì lý do: '${rejectionReason}', chúng tôi xin thông báo rằng lịch hẹn khám bệnh của Quý khách đã được hủy:
                    <ul>
                        <li>Tên bác sĩ: ${doctorName}</li>
                        <li>Ngày và giờ hẹn: ${time}/${date}</li>
                    </ul>
                    <br>Nếu Quý khách cần hỗ trợ đặt lại lịch hẹn, vui lòng liên hệ với chúng tôi qua:
                    <br>Số điện thoại: 0777435783
                    <br>Email: sanghip200@gmail.com
                    <br>Chúng tôi rất mong nhận được sự thông cảm từ Quý khách và hy vọng được phục vụ Quý khách trong thời gian sớm nhất.
    
                    <p>Trân trọng</p>
            </div>`,
        });
        console.log('send mail successfully');
    } catch (err: any) {
        console.log(err.message);
    }
};
