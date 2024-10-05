import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import 'video-react/dist/video-react.css'
import { BigPlayButton, Player } from "video-react"
import IconBtn from "../../Common/IconBtn";
const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const [previewSource, setPreviewSource] = useState("")
  const location = useLocation();
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(()=> {

    const setVideoSpecificDetails = async() => {
        if(!courseSectionData.length)
            return;
        if(!courseId && !sectionId && !subSectionId) {
            navigate("/dashboard/enrolled-courses");
        }
        else {
            //let's assume k all 3 fields are present
            console.log("Course Sec Data .,",courseSectionData)
            const filteredData = courseSectionData.filter(
                (course) => course._id === sectionId
            )
          console.log("filterData = ",filterData);
            const filteredVideoData = filteredData?.[0].SubSection?.filter(
                (data) => data._id === subSectionId
            )

            setVideoData(filteredVideoData[0]);
            setPreviewSource(courseEntireData.thumbnail)
            setVideoEnded(false);

        }
    }
    setVideoSpecificDetails();

  },[courseSectionData, courseEntireData, location.pathname])
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].SubSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSection =
      courseSectionData[currentSectionIndex].SubSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].SubSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSection =
      courseSectionData[currentSectionIndex].SubSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].SubSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSection - 1) {
      // same section ki next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].SubSection[
          currentSubSectionIndex + 1
        ]._id;
      // iss video pr jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].SubSection[0]._id;
      // is video pr chale jao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection = courseSectionData[currentSectionIndex].SubSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((data) => data._id === subSectionId);

    if(currentSectionIndex !== 0){
      // same section but previous video pr jao
      const previousSubSectionId = courseSectionData[currentSectionIndex].SubSection[currentSubSectionIndex-1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
      ); 
    }
    else{
     //different section , last video
     const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
     const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].SubSection.length;
     const prevSubSectionId = courseSectionData[currentSectionIndex - 1].SubSection[prevSubSectionLength - 1]._id;
     //iss video par chalge jao
     navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  };
  const handleLectureCompletion = async() => {
    setLoading(true);
    const res = await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token);
    // state update
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false)

  };
  return (<div className="flex flex-col gap-5 text-white">
    {!videoData ? (
      <img
        src={previewSource}
        alt="Preview"
        className="h-full w-full rounded-md object-cover"
      />
    ) : (
      <Player
        ref={playerRef}
        aspectRatio="16:9"
        playsInline
        onEnded={() => setVideoEnded(true)}
        src={videoData?.videoUrl}
      >
        <BigPlayButton position="center" />
        {/* Render When Video Ends */}
        {videoEnded && (
          <div
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
            }}
            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
          >
            {!completedLectures.includes(subSectionId) && (
              <IconBtn
                disabled={loading}
                onclick={() => handleLectureCompletion()}
                text={!loading ? "Mark As Completed" : "Loading..."}
                customClasses="text-xl max-w-max px-4 mx-auto"
              />
            )}
            <IconBtn
              disabled={loading}
              onclick={() => {
                if (playerRef?.current) {
                  // set the current time of the video to 0
                  playerRef?.current?.seek(0)
                  setVideoEnded(false)
                }
              }}
              text="Rewatch"
              customClasses="text-xl max-w-max px-4 mx-auto mt-2"
            />
            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={goToPreviousVideo}
                  className="blackButton"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={goToNextVideo}
                  className="blackButton"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </Player>
    )}

    <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
    <p className="pt-2 pb-6">{videoData?.description}</p>
  </div>);
};

export default VideoDetails;
