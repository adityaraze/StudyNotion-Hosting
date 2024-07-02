import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/TimeLineLogo/Logo1.svg"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK Failed To Load");
            return;
        }

        // initaite the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
            {courses},
        {
            Authorization:`Bearer ${token}`,
        })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        console.log("PRINTING ORDER DATA RESPONSE -> ",orderResponse);
        //options
        const options = {
            kry:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank You For Purchasing The Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function (response){
                // send successfull wala email
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                // verify payment
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed",function(response){
            toast.error("oops,Payment failed");
            console.log(response.error)
        })
    }
    catch(error){
        console.log(error);
        toast.error(error.message);

    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error){
        console.log("PAYEMENT_SUCCESS_EMAIL_ERROR",error);

    }
}

// verify payment

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfull,You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(error){
        console.log("Payment verify error",error.message);
        toast.error("clould not verify payment");
         
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}