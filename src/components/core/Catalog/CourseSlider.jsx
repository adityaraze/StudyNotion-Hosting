import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {freeMode,Pagination,Autoplay,Navigation} from 'swiper/modules'
import Course_Card from './Course_Card'
const CourseSlider = ({Courses}) => {
  return (
    <>
    {
        Courses?.length ? (
            <Swiper loop={true}
            slidesPerView={1}
            spaceBetween={200}
            pagination={true}
            modules={[Autoplay,Pagination,Navigation]}
                    className="max-h-[30rem]"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:2,}
                    }}      
            >
            {
              Courses?.map((course,index)=>(
                <SwiperSlide key={index}>
                <Course_Card course={course} Height={"h-[250px]"}/>
                </SwiperSlide>
              ))
            }
            </Swiper>
        ) : (
            <p className="text-xl text-richblack-5">No Course Found</p>
        )
    }
    </>
  )
}

export default CourseSlider