const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReviews.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReviews.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.getAverageRating = async(req,res) =>{
    try{
        // get CourseId
        const courseId = req.body.courseId;
        // calculate the average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average rating claculated",
                averageRating:result[0].averageRating
            });
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Issue in finding Average rating and review "
        })
    }
}

exports.getAllRating = async(req,res) =>{
    try{
        const allReviews = await RatingAndReviews.find({}).sort({rating:"desc"}).populate({path:"user",select:"firstName lastName email image"}).populate({path:"course",select:"courseName"}).exec();

        return res.status(200).json({
            success:true,
            message:"All rating fetched successfully",
            data:allReviews,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Issue in getting all ratings,server faults"
        })
    }
}