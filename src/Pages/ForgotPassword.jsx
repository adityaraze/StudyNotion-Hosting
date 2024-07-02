import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from './Spinner';
const ForgotPassword = () => {
    const {loading} =  useSelector((state)=>state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    const handelOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div className='text-white flex items-end justify-center relative'>
    {
        loading ? (
            <Spinner/>
        ) : (
            <div className='flex flex-col items-start justify-center lg:w-[508px] lg:h-[448px] gap-[25px] absolute top-[100px] left-[550px]'>
            <h1 className='text-[#F1F2FF] text-3xl font-bold'>
                {
                    !emailSent ? "Reset Your Password" : "Chech Your Email"
                }
            </h1>
            <p className='lg:w-[448px] text-[#AFB2BF] text-lg font-inter'>
                {!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`}
            </p>
            <form onSubmit={handelOnSubmit}>
                {
                    !emailSent && (
                        <label>
                            <p >Email Address</p>
                            <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Enter Your Email Address'
                                className='bg-[#161D29] p-[12px] w-[444px] text-white rounded-[8px]'
                            />
                        </label>
                    )
                }
                <button type='submit'
                className={`text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 shadow-md shadow-richblack-100 mt-7 lg:w-[444px]`}>
                    {
                        !emailSent ? "Reset Password" :"Resend Email" 
                    }
                </button>
            </form>
            <div>
                <Link to="/login"
                className='flex flex-row items-center justify-center gap-2'>
                <FaArrowLeft/>
                    <p>Back To Login</p>
                </Link>
            </div>
            </div>
        )
    }
    </div>
  )
}

export default ForgotPassword