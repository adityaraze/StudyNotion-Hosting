import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const submitContactForm = async (data) => {
    console.log("Logging data ", data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      //  iska controller abhi likha nhi hai
      const response = { status: "OK" };
      console.log("Logging Response ", response);
      setLoading(false);
    } catch (err) {
      console.log("Ek Error Aaya Hai", err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="max-w-md mx-auto p-6 mt-5 bg-gray-900 rounded-lg shadow-lg border-[1px] border-[#424854]">
      <h2 className="text-2xl font-bold mb-4 text-white">Got a Idea? We’ve got the skills. Let’s team up</h2>
      <p className="mb-6 text-richblack-5">Tell us more about yourself and what you're got in mind.</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* firstname */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstname" className="mb-2 text-sm text-white">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="p-2 border border-white rounded-md bg-gray-800 text-richblack-700 placeholder-gray-400"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span className="text-red-500 text-sm mt-1">Please Enter Your Name</span>}
          </div>
          {/* lastName */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastname" className="mb-2 text-sm text-white">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="p-2 border border-white rounded-md bg-gray-800 text-richblack-700 placeholder-gray-400"
              placeholder="Enter last name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && <span className="text-red-500 text-sm mt-1">Please Enter Your Last Name</span>}
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm text-white">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 border border-white rounded-md bg-gray-800 text-richblack-700 placeholder-gray-400"
            placeholder="Enter email address"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">Please Enter Your Email Address</span>}
        </div>
        {/* phoneNo */}
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="mb-2 text-sm text-white">Phone Number</label>
          <div className="flex gap-2">
            {/* dropdown */}
            <select
              name="dropdown"
              id="dropdown"
              className="p-2 border border-white rounded-md bg-gray-800 text-richblack-700 w-16"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => {
                return (
                  <option
                    className="text-sm bg-gray-900 text-richblack-700"
                    key={index}
                    value={element.code}
                  >
                    {element.code} - {element.country}
                  </option>
                );
              })}
            </select>
            {/* phoneNo */}
            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              className="p-2 flex-1 border border-white rounded-md bg-gray-800 text-richblack-700 placeholder-gray-400"
              {...register("phoneNo", {
                required: { value: true, message: "Please Enter Your Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNo && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phoneNo.message}
            </span>
          )}
        </div>
        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 text-sm text-white">Message</label>
          <textarea
            name="message"
            id="message"
            className="p-2 border border-white rounded-md bg-gray-800 text-richblack-700 placeholder-gray-400"
            cols="30"
            rows="4"
            placeholder="Enter your message"
            {...register("message", { required: true })}
          />
          {errors.message && <span className="text-red-500 text-sm mt-1">Please Enter Your Message</span>}
        </div>
        <button
          className="p-2 bg-yellow-50 text-black rounded-md font-bold"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
