import email from '@sendgrid/mail';
import * as dotenv from "dotenv";

dotenv.config();
const apikey: any | any = process.env.SENDGRID_API_KEY;
email.setApiKey(apikey)

const sendEmail = async (emailAddress: string, authCode: string) => {
    const emailContent = {
        to: emailAddress,
        from: "em9466.mx.huelet.net",
        subject: "Verify your email",
        text: `Verify your email. Your code is ${authCode}`,
    }
    email
        .send(emailContent)
        .then(() => {
            console.log("Email sent!");
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
    return true;
};

export default sendEmail;