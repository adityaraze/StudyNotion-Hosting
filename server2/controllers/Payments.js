const {instance} = require("../config/razorpay");
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../controllers/mail/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("./mail/paymentSuccessEmail")
const mongoose  = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

   // initiate the order 
   exports.capturePayment = async(req,res) =>{
    const {courses} = req.body;
    const userId = req.user.id;
    if(courses.length === 0){
        return res.json({success:false,message:"Please provide course Id"});
    }

    let total_amount = 0;
    for(const course_id of courses){
        let course
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:false,message:"Could not find the Course"});
            }

            const uid = new mongoose.Types.ObjectId(userId);
            let falg = course.studentEnrolled.includes(uid)
            console.log("flag ",falg);
            console.log("UID ",uid);
            console.log("course",course)

            if(falg) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            total_amount += course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const currency = "INR";
    const options = {
        amount: total_amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error){
        console.log("error  ",error.message)
        return res.status(500).json({
            success:false,
            message:`Error While Creating Order Of The Payment`
        })
    }
   }

   // for payment veryfication
   exports.verifyPayment = async(req,res) =>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    const uid = ObjectId(userId);
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || ! userId){
        return res.status(200).json({
            success:false,
            message:"Payment Failes"
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll krwao student ko
        await enrolledStudents(courses,userId,res);
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    return res.status(500).josn({
        success:false,
        message:"Payment Verification"
    })
    }

    const enrolledStudents = async(courses,userId,res) =>{
        if(!courses || !userId){
            return res.status(404).json({
                success:false,
                message:"courses or userId not found"
            });
        }

        for(const courseId of courses){
            try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                {$push:{studentEnrolled:userId}},
                {new:true},
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[]
            })
            // find the student and add the course to their list of enrolled courses

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId,
                    courseProgress:courseProgress._id,
                }},{new:true}
            )

            // student ko mail send krdo
            const emailResponce = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} " " ${enrolledStudent.lastName}`)
            )
            console.log("Email Sent Successfully ",emailResponce);
            }
            catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message,
                })
            }
        }
    }

    exports.sendPaymentSuccessEmail = async(req,res) =>{
        const {orderId,paymentId,amount} = req.body;
        const userId = req.user.id;
        if(!orderId || !paymentId || !amount || !userId){
            return res.status(400).json({
                success:false,
                message:"Please Provide all the fields"
            })
        }

        try{
            const enrolledStudent = await User.findById(userId);
            await mailSender(
                enrolledStudent.email,
                `Payment Recieved`,
                paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId),
            )
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Could not send email"
            })
        }
    }
// exports.capturePayment = async(req,res) =>{
//     try{
//       // get course id and user id
//       const {course_id} = req.body;
//       const userId = req.user.id;
//       // validation
//       // valid course id 
//       if(!course_id){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide valid course id"
//         });
//       }
//       // valid course details
//       let course;
//       try{
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 success:"Could Not Find The Course",
//             });
//         }
//         // user already pay for the same course
//         const uid = new moongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"Student is already Enrolled",
//             });
//         }
//       }
//       catch(err){
//            return res.status(500).json({
//             success:false,
//             message:err.message
//            }) 
//       }
//       // order create 
//       const amount = course.price;
//       const currency = "INR";
//       const options = {
//         amount:amount*100,
//         currency,
//         reciept:Math.random(Date.now().toString()),
//         notes:{
//             courseId:course_id,
//          userId,
//         }
//       }
//       try{
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.create(options);
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.orderId,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//         })
//       }catch(err){
//         console.log(err);
//         return res.json({
//             success:false,
//             message:"Could not initiate the order"
//         })
//       }
//       // return response  
//     }
//     catch(err){

//     }
// }

// exports.verifySignature = async(req,res)=>{
//     const webHookSecret = "123456789";
//     const signature = req.header["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256",webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if(signature === digest){
//         console.log("Payment Is Authorized");

//         const {courseId,userId} = req.body.payload.pament.entity.notes;
//         try{
//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpadte({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course Not Found"
//                 });
//             }
//             console.log(enrolledCourse);
//             // find the student and add the course in the list of enrolled courses
//             const enrolledStudent = await User.findOneAndUpadte({_id:userId},{$push:{courses:courseId}},{new:true});
//             console.log(enrolledStudent);
//             // mail send krdo confirmation wala
//             const emailResponce = await mailSender(enrolledStudent.email,"Congratulation From Aditya Modanwal","Congratulation You Are Enrolled In The Course Successfully",)
//             console.log(emailResponce);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified And Course Added"
//             })
//         }catch(err){
//             console.log(err.message);
//             return res.status(500).json({
//                 success:false,
//                 message:err.message
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Signature Not Matched With WebHook"
//         })
//     }
// }