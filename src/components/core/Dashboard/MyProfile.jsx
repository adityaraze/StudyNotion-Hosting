import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter"
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("User in myprofile", user?.additionalDetails?.about);
  const navigate = useNavigate();
  return (
    <div className=' '>
        <h1 className=' mb-14  lg:text-3xl md:text-3xl text-2xl font-medium text-richblack-5 lg:mt-3 md:mt-3 mt-12'>
            My Profile
        </h1>
        {/* section 1 */}
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:gap-0 md:gap-0 gap-5   lg:px-12 md:px-12 px-5 lg:p-8 md:p-8 p-4 lg:mr-0 md:mr-0 mr-2  '>
            <div className='flex items-center lg:gap-x-4  md:gap-x-4 gap-x-4'>
                <img src= {user?.image} alt={`profile-${user?.firstName}`}
                className='aspect-square lg:w-[78px] md:w-[78px] w-[45px] rounded-full object-cover'/>
               
                <div className='lg:space-y-1 md:space-y-1 '>
                    <p className='text-lg font-semibold text-richblack-5'>
                    {user?.firstName +" "+ user?.lastName}
                    </p>
                    <p className='lg:text-sm md:text-xs text-[12px] text-richblack-300'>
                        {user?.email}
                    </p>
                </div>
            </div>
          

            <IconBtn 
            text='Edit'
            onclick={()=>{
                navigate("/dashboard/settings")
            }}

            >
             <RiEditBoxLine />  
            </IconBtn>
           
        </div>

        {/* ssection 2 */}
        <div className='my-10 flex flex-col lg:gap-y-10 md:gap-y-10 gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:gap-0 md:gap-0 gap-5   lg:px-12 md:px-12 px-5  lg:p-8 md:p-8 p-4 lg:mr-0 md:mr-0 mr-2'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <IconBtn
                  text ="Edit"
                  onclick={() =>{
                    navigate("/dashboard/settings")
                  }}
                >
                <RiEditBoxLine />  
                </IconBtn>
            </div>
            <p className= {`${user?.additionalDetails?.about ? "text-richblack-5":"text-richblack-400"} text-sm font-medium`}>
                {user?.additionalDetails?.about ?? "Write Something about Yourself"}
           </p>
        </div>

        {/* section 3 */}
         
        <div className='my-10  flex flex-col lg:gap-y-10 md:gap-y-10 gap-y-5  rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:gap-0 md:gap-0 gap-5   lg:px-12 md:px-12 px-5 lg:p-8 md:p-8 p-4 lg:mr-0 md:mr-0 mr-2'>
        <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>
                Personal Details
                </p>
                <IconBtn
                  text ="Edit"
                  onclick={() =>{
                    navigate("/dashboard/settings")
                  }}
                >
                <RiEditBoxLine />   
                </IconBtn>
            </div>
            <div className='flex  max-w-[500px] lg:justify-between md:justify-between '>
                <div className='flex flex-col lg:gap-y-5 md:gap-y-5 gap-y-4 lg:gap-x-0 md:gap-x-0 gap-x-7 lg:w-60 md:w-60 w-60'>
                <div className='flex flex-col gap-y-5'>
                    <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                    <p className='text-sm font-semibold text-richblack-5'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Email </p>
                    <p className='lg:text-sm md:text-sm text-sm lg:font-semibold md:font-semibold font-semibold text-richblack-5 '>{user?.email}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                    <p className='text-sm font-semibold text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                </div>
                <div className='flex flex-col lg:gap-y-5 md:gap-y-5 gap-y-4'>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                    <p className='text-sm font-semibold text-richblack-5'>{user?.lastName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                    <p className='text-sm font-semibold text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add contact Number"}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
                    <p className='text-sm font-semibold text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add your Date of Birth"}</p>
                </div>
                </div>
            </div>
         </div>

    </div>
  );
};

export default MyProfile;
