import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../Common/RatingStars"
import GetAvgRating from '../../../utils/avgRating';
const Course_Card = ({course,Height}) => {
    const [avgRatingCount,setAvgRatingCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgRatingCount(count);

    },[course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img
                    src={course?.thumbnail}
                    alt='course ka thumbnail'
                    className={`${Height} w-full rounded-xl object-cover `}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-50">{avgRatingCount || 0}</span>
                      <RatingStars/>
                      <span>{course?.ratingAndReviews?.length}</span>
                    </div>
                    <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card