const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async(email,title,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"Study Notion || By Aditya Modanwal",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("Mail Info ",info);
        return info;
    }catch(err){
        console.log(err.message);
    }
}

module.exports = mailSender;