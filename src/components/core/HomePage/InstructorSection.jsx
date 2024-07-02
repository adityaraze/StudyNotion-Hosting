import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import CTAButton from "../HomePage/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import HighlightText from "../HighlightText";
const InstructorSection = () => {
  return (
    <div className="mt-16 mb-32">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%] insImg">
          <img
            src={InstructorImage}
            alt="Instructor Image"
            className="shadow-white"
          />
        </div>
        <div className="lg:w-[50%] flex gap-10 flex-col">
          <div className="text-4xl items-center font-inter lg:w-[50%] font-semibold ">
            Become an <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signUp"}>
              <div className="flex flex-row gap-3 items-center">
                Start Learning Today
                <FaLongArrowAltRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
