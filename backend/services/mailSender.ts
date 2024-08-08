import { readFileSync } from "fs"
import Handlebars from "handlebars"
import mjml2html from "mjml"
import nodemailer from "nodemailer"
import { createSimpleLogger } from "simple-node-logger"

const mailSrvLog = createSimpleLogger('mailService.log')

let config = {
    service: 'gmail',
    auth: {
        user: process.env.FROMMAIL,
        pass: process.env.MAILPASS
     }
}

const MJMLtoHTML = async(filename: string): Promise<string>  => {
    try{
        const src = readFileSync(filename, 'utf-8').toString()
        const mjmlout = mjml2html(src)

        return mjmlout.html
    }
    catch(err){
        console.log("MJML Conversion error")
        console.log(err)
        return "Unexpected error"
    }
}

export const sendVerificationMail = async(uuid: string, receiver: string) => {

    let transporter = nodemailer.createTransport(config);

    const htmlsrc = await MJMLtoHTML("./services/emails/verifyAcc.mjml")

    if(htmlsrc === "Unexpected error"){
        mailSrvLog.error("Failed to send verification mail to user identified by: ", uuid, " at ", new Date().toLocaleString(), " - REASON: MJML conversion error")
        return
    } 

    const template = Handlebars.compile(htmlsrc)

    const replacements = {
        uuid
    }

    const htmlToSend = template(replacements)

    let message = {
        from: process.env.FROMMAIL,
        to: receiver,
        subject: 'Verify Account - DoubleQuotes',
        html: htmlToSend
    };

    transporter.sendMail(message)
        .then(info => {
            console.log("Mail send succesfully!")
        })
        .catch(err => {
            console.log("Mail failed to send!")
        })
}