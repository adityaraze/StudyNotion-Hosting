const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
exports.updateProfile = async (req, res) => {
  try {
    // get the data
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    // get the user id -> if user logged in hai to authentication ke time payload me user id tha usme
    const userId = req.user.id;
    // validation
    if (!gender || !contactNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // find profile
    const userDetails = await User.findById(userId);
    const profileDetails = await Profile.findById(userDetails.additionalDetails)
      .populate()
      .exec();
    // update profile
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Issue In Updating The Profile",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    // validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(402).json({
        success: false,
        message: "Incorrect user id",
      });
    }
    // delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    // delete profile
    await User.findByIdAndDelete({ _id: id });
    // return response
    return res.status(200).json({
      success: true,
      message: "User And Profile Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue In Deleting The User And Profile",
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All User deatils Fetched Successfully",
      userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue In Fetching The UserDetails",
      error: err.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log("image", image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    }).populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "SubSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
      // .populate("courses")
      // .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentEnrolled = course.studentEnrolled.length
      const totalAmountGenerated = totalStudentEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
