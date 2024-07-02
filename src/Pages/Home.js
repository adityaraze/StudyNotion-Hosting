import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/Codeblocks";
import Banner from "../assets/Images/banner.mp4";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/Common/Footer"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import ReviewSlider from "../components/Common/ReviewSlider"
const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to={"/signUp"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become An Instructor</p>
              <div>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <HighlightText text={"  Coding Skills"} />
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          Become an Instructor Empower Your Future with Coding Skills With our
          online coding courses, you can learn at your own pace, from anywhere
          in the world, and get access to a wealth of resources, including
          hands-on projects, quizzes, and personalized feedback from
          instructors. Learn More Book a Demo
        </div>

        <div className="flex flex-row gap-7 mt-10">
          <CTAButton active={true} linkto={"/signUp"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/signUp"}>
            Book A Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="w-11/12">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potentials "} />
                with our online courses.
              </div>
            }
            subheading={
              <p>
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ctabtn1={{
              btnText: "Try It Your",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={" Coding in seconds"} />
              </div>
            }
            subheading={
              <p >
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </p>
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>`}
            codeColor={"text-[#ff4500]"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
          <div>
            <ExploreMore/>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white mt-20">
              <CTAButton active={true} linkto={"/signUp"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaLongArrowAltRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text="   Job that is in demand" />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signUp"}>
                Learn More
              </CTAButton>
            </div>
          </div>

        <TimelineSection/>

        <LearningLanguageSection/>
        </div>


      </div>
      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col justify-between items-center gap-8 bg-richblack-900 text-white">
      <InstructorSection/>
      <ReviewSlider/>
      </div>
      <Footer/>
      {/* Footer */}
    </div>
  );
};

export default Home;
