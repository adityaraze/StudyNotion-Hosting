import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner';
import { useLocation,useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state)=>state.auth);
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {password,confirmPassword} = formData;
    const handelOnChange = (e)=>{
        setFormData((prevData)=>(
        {
            ...prevData,
            [e.target.name] : e.target.value,
        }
    ))
    }

    const handelOnSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    {
        loading ? (<Spinner/>) : (
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handelOnSubmit}>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password*</p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            placeholder='New Password'
                            onChange={handelOnChange}
                            className="lg:w-[444px] p-[12px] bg-[#161D29] rounded-[8px] text-richblack-5"
                        />
                        <span
                        onClick={()=>setShowPassword((prev)=>!prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword ? <IoEyeOutline fontSize={24} color='white'/> : <IoEyeOffOutline fontSize={24} color='white'/>
                            }
                        </span>
                    </label>
                    <label className="relative mt-3 block">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password*</p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm New Password'
                            onChange={handelOnChange}
                            className="lg:w-[444px] p-[12px] bg-[#161D29] rounded-[8px] text-richblack-5"
                        />
                        <span
                        onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                         className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showConfirmPassword ? <IoEyeOutline fontSize={24} color='white'/> : <IoEyeOffOutline fontSize={24} color='white'/>
                            }
                        </span>
                    </label>
                    <button type='submit'
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                    >
                    Reset Password
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                    <p className="flex items-center gap-x-2 text-richblack-5">Back to Login</p>
                    </Link>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default UpdatePassword