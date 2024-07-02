const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req,res) =>{
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;
    console.log("courseId",courseId);
    console.log("subSectioinId",subSectionId);
    console.log("userId",userId);

    try{
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Invalid SubSection"
            })
        }
        // check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            // userId:userId
        })

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress Does not exist",
            })
        }

        else{
            // check for recompleting video or subsection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection is already completed",
                })
            }
            // push into completed videos
            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}