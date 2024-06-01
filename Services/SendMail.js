import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

export const SendResetMail = async (mailReceiver,message)=>{
    try {
        let transport  =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EmailId,
                pass:process.env.EmailAppCode,
            },
        })
        
        // Email Content
        const mailContents = {
            from:process.env.EmailId,
            to:mailReceiver,
            subject:"Reset Password link for Movie Ticket Booking Website",
            html:message
        }

        // Send Mail
        const info  =  await transport.sendMail(mailContents)
        // console.log("Email sent:" + info.response)
    } catch (error) {
        console.log("Error Sending Email:",error);
    }
}

export const SendConfirmationMail = async (mailReceiver,message)=>{
    try {
        let transport  =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EmailId,
                pass:process.env.EmailAppCode,
            },
        })
        
        // Email Content
        const mailContents = {
            from:process.env.EmailId,
            to:mailReceiver,
            subject:"Movie Booking Confirmation",
            html:message
        }

        // Send Mail
        const info  =  await transport.sendMail(mailContents)
        // console.log("Email sent:" + info.response)
    } catch (error) {
        console.log("Error Sending Email:",error);
    }
}