const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

// auth

exports.auth = async(req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        console.log("Token in auth middlerware ",token);
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing in auth",
            });
        }
        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("Decode ",decode);
            req.user = decode // ye kya hai

        }
        catch(err){
            console.log(err.message);
            return res.status(400).json({
                success:false,
                message:"Issue In Verification Of the Token"
            })
        }
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Issue in auth middleware"
        })
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a protected routes for students only."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User Role Can Not Be Verified Please Try Again Later",
            error:err.message
        })
    }
}
exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is a protected routes for Instructor only."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User Role Can Not Be Verified Please Try Again Later"
        })
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is a protected routes for Admin only."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User Role Can Not Be Verified Please Try Again Later"
        })
    }
}

