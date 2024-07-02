import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../../../services/operations/authAPI"
function LoginForm({ setIsLoggedIn }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })
  
    const [showPassword, setShowPassword] = useState(false)
  
    const { email, password } = formData
  
    const ChangeHandler = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  
    const SubmitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password, navigate))
    }
  return (
    <form
      onSubmit={SubmitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>

        <input
          required
          type="email"
          value={formData.email}
          onChange={ChangeHandler}
          placeholder="Your Email Id"
          name="email"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </label>

      <label className="relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>

        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={ChangeHandler}
          placeholder="Password"
          name="password"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs text-blue-100 mt-1 max-w-max ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>

      <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] font-medium text-richblack-900 mt-8">
        Sign In
      </button>
    </form>
  );
}
export default LoginForm;
