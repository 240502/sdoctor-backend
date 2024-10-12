const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanghip200@gmail.com',
        pass: 'vnwp rrvp pvjn rcij',
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function send(
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
