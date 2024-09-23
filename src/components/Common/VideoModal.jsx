import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import  IconBnt  from './IconBtn';
import { MdOutlineArrowBackIos } from 'react-icons/md';


export const VideoModal = ({setReviewModal,setModal}) => {
    const [activeStatus,setActiveStatus] =  useState("");
    const [videobarActive,setVideobarActive] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sectionId,subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,

    } = useSelector((state) => state.viewCourse);

    useEffect(() =>{
         const setActiveFlags = () =>{
          if(!courseSectionData.length) return;
         

          const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
          )

         const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (data) => data._id === subSectionId
         )

         const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
        //  set current section here
         setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        //  set current sub-section here
         setVideobarActive(activeSubSectionId);
         }
         setActiveFlags();
    },[courseSectionData,courseEntireData,location.pathname])
  return (
    <div className=' lg:hidden md:hidden fixed   inset-0 z-[200]  grid place-items-start  justify-items-start mt-14 overflow-auto transition-all duration-700   '>

      
<div className="  flex h-[calc(100vh-3.5rem)] w-[200px] max-w-[300px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">

        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBnt
              text="Add Review"
              customClasses=" text-xs ml-auto h-25 w-25 p-1 ml-5"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
 
 
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-180"
                        : "rotate-0"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection?.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videobarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideobarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          ))}
        </div>
        <div className=' flex justify-center '>
       <button  
       onClick={()=> setModal(false)}
       className='mt-6 h-10 w-20 text-sm text-center px-3 bg-yellow-100 rounded-md'
       >
       <MdOutlineArrowBackIos  size={30} className='text-center ml-3 text-black' />
       </button>

{/*                  <IconBnt  
       onclick={()=> setModal(false)}
       text={"Cancel"}
       customClasses={'mt-6 h-10 w-20 text-sm   px-4 '}
       /> */}
   
        </div>
      
      </div>
     
     </div>
  )
}