import { Route, Routes,useNavigate } from "react-router-dom";
import "./App.css";
import Home from "../src/Pages/Home";
import Navbar from "../src/components/Common/Navbar";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import About from "./Pages/About";
import {Contact} from "./Pages/Contact"
import ForgotPassword from "./Pages/ForgotPassword";

import UpdatePassword from "./Pages/UpdatePassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./Pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./Pages/Error"
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/Cart/index";
import {ACCOUNT_TYPE} from "../src/utils/constant"
import Settings from "./components/core/Dashboard/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import { getUserDetails } from "./services/operations/profileAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = JSON.parse(localStorage.getItem("token"))
  //     dispatch(getUserDetails(token, navigate))
  //   }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route path="/login" element={<OpenRoute>
          <Login />
        </OpenRoute>} />
        <Route path="/signUp" element={<OpenRoute>
          <Signup />
        </OpenRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={
          <Contact />} />
        <Route path="/forgot-password" element={<OpenRoute>
          <ForgotPassword />
        </OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute>
          <VerifyEmail />
        </OpenRoute>} />
        <Route path="update-password/:token" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        >
          <Route path="dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="dashboard/Settings" element={<Settings />} />
      
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart/>}/>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourse/>}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/add-course" element={<AddCourse/>}/>
              <Route path="dashboard/instructor" element={<Instructor/>}/>
              <Route path="dashboard/my-courses" element={<MyCourses/>}/>
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>

              </>
            )
          }
          
        </Route>
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails/>}
              >

              </Route>
            </>
          )
        }
        </Route>

        {/* <Route path="*" element={<Error/>}/> */}


      </Routes>
    </div>
  );
}

export default App;
