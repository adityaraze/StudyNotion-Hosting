const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../controllers/mail/emailVerificationTemplate")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

// A function to send email
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verifiation Email From StudyNotion",otpTemplate(otp));
        console.log("Email Response" , mailResponse);
    }
    catch(err){
        console.log("Error in Sending Emails");
        console.error(err.message);
    }
}

OTPSchema.pre("save",async function(next){
    sendVerificationEmail(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",OTPSchema);