import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constant';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({response, setConfirmationModal, handleBuyCourse}) {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            console.log("dispatching add to cart")
            dispatch(addToCart(response));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    return (
        <div className='bg-[#2C333F] lg:h-[669px] lg:-[375x] mx-auto rounded-[8px]'>
            <img 
                src={response?.thumbnail}
                alt='Thumbnail Image'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl translate-x-1'
            />
            <div className='text-[30px] font-semibold text-[#f1f2ff] p-[24px]'>
                Rs. {response?.price}
            </div>
            <div className='flex flex-col gap-y-6 items-center'>
                <button
                 className='yellowButton'
                    onClick={
                        user && response?.studentEnrolled.includes(user?._id)
                        ? ()=> navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    }
                >
                    {
                        user && response?.studentEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                    }
                </button>

                {
                    (!response?.studentEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}  
                        className='blackButton'>
                            Add to Cart
                        </button>
                    )
                }
            </div>

            <div className='flex flex-col mt-[15px]'>
                <p className='text-sm text-[#DBDDEA] text-center'>
                    30-Day Money-Back Guarantee
                </p>
                <p className='font-inter text-[16px] text-[#F1F2FF] text-start mt-[15px] ml-[45px]'>
                    This Course Includes:
                </p>
                <div className='flex flex-col gap-y-2'>
                    {
                      JSON.parse(response?.instructions).map((item,index)=>(
                        <span className='text-[#06D6A0] ml-[45px] mt-[5px] text-sm'>{item}</span>
                      ))
                    }
                </div>
            </div>
            <div>
                <button
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
                onClick={handleShare}
                >
                    Share
                </button>
            </div>
        </div>
    );

}

export default CourseDetailsCard

