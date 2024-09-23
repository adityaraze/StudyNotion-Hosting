import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import ReactStars from "react-rating-stars-component";
import { apiConnector } from '../../services/apiConnector'
import { ratingsEndpoints} from '../../services/apis'
import { RiStarHalfFill, RiStarSFill, RiStarSLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
 const ReviewSlider = () => {
    const [reviews,setReviews] = useState([]);
    const {user} = useSelector((state)=> state.profile);
    const truncateWords = 15;

     useEffect(() =>{
        const fetchAllReviews = async() =>{
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("fetch Rating response",data);
          

            if(data?.success){
                setReviews(data?.data);
            }
            console.log("Printing reviews",reviews);
        }
        fetchAllReviews();
     },[])




  return (
    <div className=" ">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent ">
        <Swiper
          slidesPerView= {4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="lg:w-full  md:w-[800px]"
        >
          <div className=''>

          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className=" flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 lg:h-[192px] md:h-[192px] lg:w-[300px] md:w-[300px] h-[192px] w-[300px] " >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {user?.email}
                      </h2>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
{/*                     <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3> */}
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon = {<RiStarSFill />}
                      fullIcon = {<RiStarSLine />}
                      halfIcon={<RiStarHalfFill />}
                      

                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          </div>
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>




  )
}
export default ReviewSlider
