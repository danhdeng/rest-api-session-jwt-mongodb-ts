import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from '@/utils/logger';

// async function createTestCredentials() {
//     const creds = await nodemailer.createTestAccount();
//     log.info(creds);
// }
// createTestCredentials();
// async function sendEmail() {}

const smtp = config.get<{
    user: string;
    password: string;
    host: string;
    port: number;
    secure: boolean;
}>('smtp');

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.password },
});

async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, 'Error sending email');
            return;
        }
        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
}

export default sendEmail;
