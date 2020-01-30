
const nodemailer = require("nodemailer");
const cron = require("node-cron");

cron.schedule('*/15 * * * * *', () => {
    // sendMail();
});

const sendMail = async () => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 587,
            auth: {
                user: 'contact@bojanchurlinov.com',
                pass: 'syncmaster940n'
            }
        });

        let info = await transporter.sendMail({
            from: '"Bojan Churlinov 👻" <contact@bojanchurlinov.com>',
            to: "bchurlinov@hotmail.com, bchurlinov@gmail.com", 
            subject: "Hello ✔",
            text: "Hello world?", 
            html: "<b>Hello world?</b>"
        });

        console.log(info);

    } catch (err) {
        console.log(err);
    }
}