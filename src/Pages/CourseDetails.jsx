import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/Common/ConfirmationModal";
import Footer from "../components/Common/Footer";
import RatingStars from "../components/Common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { formattedDate } from "../utils/dateFormatter";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  const getData = async () => {
    try {
      const res = await fetchCourseDetails(courseId);
      console.log("course details res: ", res.data);
      setResponse(res.data);
    } catch (error) {
      console.error("Could not fetch Course Details", error);
    }
  };

  useEffect(() => {
    getData();
  }, [courseId]);

  useEffect(()=>{
    let lecture = 0;
    response?.courseContent?.forEach((sec)=>{
      lecture += sec.SubSection.length || 0
    })
    setTotalNoOfLectures(lecture);
  },[])

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? [...isActive, id]
        : isActive.filter((e) => e !== id)
    );
  };

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="bg-richblack-800 w-full relative">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={response?.thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {response?.courseName}
                </p>
              </div>
              <p className="text-richblack-200">{response?.courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{4}</span>
                <RatingStars Review_Count={4} Star_Size={24} />
                <span>0</span>
                <span>{`${response?.studentEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By{" "}
                  {`${response?.instructor?.firstName} ${response?.instructor?.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at{" "}
                  {formattedDate(response?.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {response?.price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              response={response}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{response?.whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {response?.courseContent.length} section(s)
                  </span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
            <div className="py-4">
              {response?.courseContent?.map((response, index) => (
                <CourseAccordionBar
                  response={response}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    response?.instructor?.image
                      ? response?.instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.instructor?.firstName} ${response?.instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${response?.instructor?.firstName} ${response?.instructor?.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {response?.instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      <Footer />
    </div>
  );
}

export default CourseDetails;
