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
export async function sendBookingSuccess(
    patientName: string,
    email: string,
    doctorName: string,
    time: string,
    date: string,
    location: string,
    status: string,
    fee: number,
    serviceName: string,
) {
    // send mail with defined transport object
    await transporter.sendMail({
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

export const sendConfirmSuccess = async (
    patientName: string,
    email: string,
    doctorName: string,
    time: string,
    date: string,
    location: string,
    status: string,
    fee: number,
    serviceName: string,
) => {
    await transporter.sendMail({
        from: 'sanghip200@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Xác nhận lịch hẹn', // Subject line
        text: 'Cảm ơn bạn đã tin tưởng đặt lịch hẹn ở hệ thống của chúng tôi!', // plain text body
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Thông báo</h2>
        <p>Kính gửi <strong>${patientName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng lịch hẹn của quý khách đã được xác nhận với thông tin chi tiết như sau:</p>
        <ul>
            <li><strong>Bác sĩ:</strong>${doctorName}</li>
            <li><strong>Ngày hẹn:</strong> ${date.slice(0, 10)}</li>
            <li><strong>Thời gian:</strong> ${time}</li>
            <li><strong>Địa điểm:</strong>${location}</li>
            <li><strong>Dịch vụ:</strong> ${serviceName}</li>
            <li><strong>Phí khám:</strong> ${fee.toLocaleString(undefined)}</li>
            <li><strong>Trạng thái:</strong> ${status}</li>
           
        </ul>
         <p>Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục. Nếu có bất kỳ thay đổi nào về lịch hẹn, xin liên hệ với chúng tôi qua số <strong>0777435783</strong> hoặc email <strong>sanghip200@gmail.com</strong></p>
        <p>Chúng tôi rất mong được phục vụ quý khách và cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi.</p>
        <p>Trân trọng,</p>
        <p><strong>SDOCTOR</strong><br>
    </div>
`,
    }),
        (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log('oke');
            }
        };
};

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
