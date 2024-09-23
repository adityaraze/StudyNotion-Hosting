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
    <form onSubmit={handleSubmit(submitContactForm)}
    className='flex flex-col gap-7'
   >
   <div className='flex flex-col gap-5 lg:flex-row '>
   <div className='flex flex-col gap-2 lg:w-[48%] '>
       {/* firstName */}
     
           <label htmlFor='firstname' className='lable-style'>First Name</label>
           <input type="text" 
           name='firstname'
           id='firstname'
           placeholder='Enter first name'
           className='form-style'
           {...register("firstname",{required:true})}
           />
           {
               errors.firstname &&(
                   <span className='-mt-1 text-[12px] text-yellow-100'>
                       please enter Your first name
                   </span>
               )
           }
       </div>
       {/* lastName */}
       <div className='flex flex-col gap-2 lg:w-[48%]'>
           <label htmlFor='lastname' className='lable-style'>Last Name</label>
           <input type="text" 
           name='lastname'
           id='lastname'
           placeholder='Enter last name'
            className='form-style'
           {...register("lastname")}
           />
         
       </div>
    </div>
       {/* email */}
       <div className='flex flex-col gap-2'>
           <label htmlFor="email" className='lable-style'>Email Address</label>
           <input
            type="email"
            name='email'
            id='email'
            placeholder='Enter Email Address'
             className='form-style'
            {...register("email",{required:true})}
            
            />
            {
               errors.email &&(
                   <span className='-mt-1 text-[12px] text-yellow-100'>
                       Please enter your email address
                   </span>
               )
            }
       </div>

       {/* phone number */}
       <div className='flex flex-col gap-2'>
           <label htmlFor="phonenumber" className='lable-style'>Phone Number</label>
            <div className='flex flex-row gap-5'>
               {/* dropdown */}
              {/* <div className='flex flex-col  w-[80px]'  > */}
                <select
                name="dropdown"
                 id="dropdown"
                 className='w-[75px] form-style'
                 {...register("countrycode",{required:true})}
                 
                 >
                   {
                      CountryCode.map((element,index) =>{
                       return (
                           <option key={index} value={element.code} className='bg-richblack-700 '>
                               {element.code} -{element.country}
                           </option>
                       )
                      })
                   }
                </select>
              {/* </div> */}


              {/* <div className='flex w-[cal(100%-90px)] flex-col '  > */}
             <input
              type="text"
              name='phonenumber'
              id='phonenumber'
              placeholder='12345 67890'
              className='text-black w-[100%] form-style'
              {...register("phonenumber",
               {
                   required:{value:true,message:"Please enter Phone Number"},
                   maxLength:{value:10 , message:"Invalid Phone Number"},
                   minLength:{value:8 , message:"Invalid Phone Number"},

               })}
              />
             
              {/* </div> */}
            </div>
            {
               errors.phoneNo &&  (
                   <span className='-mt-1 text-[12px] text-yellow-100'>
                       {errors.phoneNo.message}
                   </span>
               )
            }
       </div>

       {/* message box */}
       <div className='flex flex-col gap-2'>
       <label htmlFor="message" className='lable-style'>Message</label>
       <textarea
       name='message'
       id='message'
       cols = "30"
       rows = "7"
       placeholder='Enter You message here'
        className='form-style'
       {...register("message",{required:true})}
       
       />
       {
           errors.message &&(
               <span className='-mt-1 text-[12px] text-yellow-100'>
                   Please enter your message
               </span>
           )
       }
       </div>

       {/* button */}
       <button
       disabled={loading}
       type="submit"
       className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        }  disabled:bg-richblack-500 sm:text-[16px] `}
     >
       Send Message
     </button>
   

   </form>
  );
};

export default ContactUsForm;
