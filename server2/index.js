// const express = require("express");
// const app = express();
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const dataBase = require("./config/database");
// const cookieparser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinaryConnect} = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");
// dotenv.config();
// const PORT = process.env.PORT || 4000;
// // database connecton
// dataBase.connect();
// // middlewares
// app.use(express.json());
// app.use(cookieparser());
// // Define the CORS options
// // const corsOptions = {
// //     origin: 'http://localhost:3000', // Allow requests from this origin
// //     optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// //   };
//   const corsOptions = {
//   origin: 'https://study-notion-frontend-theta-liard.vercel.app', // Allow requests from this origin
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };
//   // Use the CORS middleware with the specified options
//   app.use(cors(corsOptions));

// app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp",
//     })
// )

// // cloudinary connect
// cloudinaryConnect();

// // routes mount
// app.use("/api/v1/auth",userRoutes);
// app.use("/api/v1/profile",profileRoutes);
// app.use("/api/v1/payment",paymentRoutes);
// app.use("/api/v1/course",courseRoutes);

// app.get("/",(req,res)=>{
//     return res.json({
//         success:true,
//         message:"Your Server Is Running",
//     });
// });

// app.listen(PORT,()=>{
//     console.log(`App is running at the port ${PORT}`);
// });

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

// Configs
const dataBase = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// PORT
const PORT = process.env.PORT || 4000;

// ------------------
// DATABASE CONNECT
// ------------------
dataBase.connect();

// ------------------
// MIDDLEWARES
// ------------------
app.use(express.json());
app.use(cookieParser());

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connect
cloudinaryConnect();

// ------------------
// CORS CONFIG
// ------------------
const allowedOrigins = [
  "http://localhost:3000", // development
  "https://study-notion-frontend-theta-liard.vercel.app", // production
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like Postman or server-to-server
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies and authorization headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ------------------
// ROUTES MOUNT
// ------------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server Is Running",
  });
});

// ------------------
// START SERVER
// ------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

