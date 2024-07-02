const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const dataBase = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
// database connecton
dataBase.connect();
// middlewares
app.use(express.json());
app.use(cookieparser());
// Define the CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  // Use the CORS middleware with the specified options
  app.use(cors(corsOptions));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connect
cloudinaryConnect();

// routes mount
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server Is Running",
    });
});

app.listen(PORT,()=>{
    console.log(`App is running at the port ${PORT}`);
});