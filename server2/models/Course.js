const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Section"
        }
    ],
    instructions: {
		type: [String],
	},
    ratingAndReviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
         ref:"RatingAndReviews"   
        }
    ],
    price:{
        type:String
    },
    thumbnail:{
        type:String
    },
    tag: {
		type: [String],
		required: true,
	},
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[
        {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        }
    ],
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},

})

module.exports = mongoose.model("Course",courseSchema);