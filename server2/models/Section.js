const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true
    },
    SubSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model("Section",sectionSchema);