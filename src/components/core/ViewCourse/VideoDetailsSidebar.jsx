import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn'; // Corrected typo in component name
import { IoIosArrowBack } from 'react-icons/io';
import { BsChevronDown } from 'react-icons/bs';
// import  VideoDetails  from './VideoDetails';
import { VideoModal } from '../../Common/VideoModal';
// import { AiOutlineMenu } from 'react-icons/ai';

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState('');
  const [videobarActive, setVideobarActive] = useState('');
  const [modal, setModal] = useState(false); // Simplified default value
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
      (data) => data._id === subSectionId
    );
    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.SubSection?.[currentSubSectionIndex]?._id;
    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideobarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  return (
    <>
      <div className='relative'>
        <div className='h-4 w-2'>
          <button className='lg:hidden md:hidden ml-1 w-4' onClick={toggleModal}>
            <AiOutlineMenu fontSize={30} fill="#AFB2BF" />
          </button>
          {modal && <VideoModal setModal={setModal} setReviewModal={setReviewModal} />}
        </div>

        <div className='hidden md:block'>
          <div className="flex h-[calc(100vh-3.5rem)] lg:w-[320px] md:w-[280px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
              <div className="flex w-full items-center justify-between">
                <div
                  onClick={() => {
                    navigate(`/dashboard/enrolled-courses`);
                  }}
                  className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                  title="back"
                >
                  <IoIosArrowBack size={30} />
                </div>
                <IconBtn
                  text="Add Review"
                  customClasses="ml-auto"
                  onClick={() => setReviewModal(true)}
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
                    <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`${
                          activeStatus === course?._id ? 'rotate-180' : 'rotate-0'
                        } transition-all duration-500`}
                      >
                        <BsChevronDown />
                      </span>
                    </div>
                  </div>

                  {/* Sub Sections */}
                  {activeStatus === course?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {course.SubSection?.map((topic, i) => (
                        <div
                          className={`flex gap-3 px-5 py-2 ${
                            videobarActive === topic._id
                              ? 'bg-yellow-200 font-semibold text-richblack-800'
                              : 'hover:bg-richblack-900'
                          }`}
                          key={i}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            );
                            setVideobarActive(topic._id);
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
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
