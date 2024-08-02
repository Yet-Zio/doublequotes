import nodemailer from "nodemailer"
import Email from './emails/Email'
import { render } from "@react-email/components";

let config = {
    service: 'gmail',
    auth: {
        user: process.env.FROMMAIL,
        pass: process.env.MAILPASS
     }
}

export const sendVerificationMail = async(uuid: string, receiver: string) => {

    let transporter = nodemailer.createTransport(config);

    // let message = {
    //     from: process.env.FROMMAIL,
    //     to: receiver,
    //     subject: 'Thank you joining doublequotes!',
    //     html: `<b>Make your very own community!</b>`+
    //     `<p><a href='http://localhost:5173/verify-email?token=${uuid}'>Verify Email</a></p>`,
    // };

    const emailHtml = render(Email({ uuid: uuid }))

    const newmsg = {
        from: process.env.FROMMAIL,
        to: receiver,
        subject: 'Thank you joining doublequotes!',
        html: emailHtml
    }

    transporter.sendMail(newmsg)
        .then(info => {
            console.log("Mail send succesfully!")
        })
        .catch(err => {
            console.log("Mail failed to send!")
        })
}