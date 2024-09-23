import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FaStar } from "react-icons/fa"
import {freeMode,Pagination,Autoplay,Navigation, FreeMode} from 'swiper/modules'
import ReactStars from "react-stars"
import { ratingsEndpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
const ReviewSlider = () => {
    const [reviews,setReviews] = useState([]);
    const truncateWords = 15;
    useEffect(()=>{
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            if(data?.success){
                setReviews(data?.data);
            }
            console.log("printing reviews",reviews);
        }
        fetchAllReviews();
    },[])
  return (
    <div className=" ">
    <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent ">
     <Swiper
  spaceBetween={25}
  loop={true}
  freeMode={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  breakpoints={{
    640: { slidesPerView: 1 }, // Small screens (mobile)
    768: { slidesPerView: 2 }, // Medium screens (tablet)
    1024: { slidesPerView: 3 }, // Large screens (laptops)
    1280: { slidesPerView: 4 }, // Extra large screens (desktops)
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  className="lg:w-full md:w-[800px]"
>
        {reviews.map((review, i) => {
          return (
            <SwiperSlide key={i}>
              <div className=" flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 lg:h-[192px] md:h-[192px] lg:w-[300px] md:w-[300px] h-[192px] w-[300px] ">
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
                  {/* <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3> */}
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
      </Swiper>
    </div>
  </div>
  )
}

export default ReviewSlider
