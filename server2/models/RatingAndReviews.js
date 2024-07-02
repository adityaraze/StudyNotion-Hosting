const mongoose = require("mongoose");

const ratingAndReviews = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:String,
        trim:true
    },
    review:{
        type:String,
        tirm:true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

module.exports = mongoose.model("RatingAndReviews",ratingAndReviews);