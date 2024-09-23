// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
// import { getInstructorData } from "../../../../services/operations/profileAPI";
// import Spinner from "../../../../Pages/Spinner";
// import { Link } from "react-router-dom";
// import InstructorChart from "./InstructorChart"
// const Instructor = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const [loading, setLoading] = useState(false);
//   const [instructorData, setInstructorData] = useState(null);
//   const [courses, setCourses] = useState([]);
//   useEffect(() => {
//     const getCourseDataWithStats = async () => {
//       setLoading(true);
//       // pending
//       const instructorApiData = await getInstructorData(token);
//       const result = await fetchInstructorCourses(token);
//       console.log(instructorApiData);
//       if (instructorApiData.length) {
//         setInstructorData(instructorApiData);
//       }
//       if (result) {
//         setCourses(result);
//       }
//       setLoading(false);
//     };
//     getCourseDataWithStats();
//   }, []);
//   const totalAmount = instructorData?.reduce(
//     (acc, curr) => acc + curr.totalAmountGenerated,
//     0
//   );
//   const totalStudent = instructorData?.reduce(
//     (acc, curr) => acc + curr.totalStudentEnrolled,
//     0
//   );

//   return (
//     <div>
//       <div className="space-y-2">
//         <h1 className="text-2xl font-bold text-richblack-5">
//           Hi {user?.firstName} 👋
//         </h1>
//         <p className="font-medium text-richblack-200">
//           Let's start something new
//         </p>
//       </div>
//       {loading ? (
//         <div className="spinner"></div>
//       ) : courses.length > 0 ? (
//         <div>
//           <div className="my-4 flex h-[450px] space-x-4">
//             {/* Render chart / graph */}
//             {totalAmount > 0 || totalStudent > 0 ? (
//               <InstructorChart courses={instructorData} />
//             ) : (
//               <div className="flex-1 rounded-md bg-richblack-800 p-6">
//                 <p className="text-lg font-bold text-richblack-5">Visualize</p>
//                 <p className="mt-4 text-xl font-medium text-richblack-50">
//                   Not Enough Data To Visualize
//                 </p>
//               </div>
//             )}
//             {/* Total Statistics */}
//             <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
//               <p className="text-lg font-bold text-richblack-5">Statistics</p>
//               <div className="mt-4 space-y-4">
//                 <div>
//                   <p className="text-lg text-richblack-200">Total Courses</p>
//                   <p className="text-3xl font-semibold text-richblack-50">
//                     {courses.length}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-lg text-richblack-200">Total Students</p>
//                   <p className="text-3xl font-semibold text-richblack-50">
//                     {totalStudent}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-lg text-richblack-200">Total Income</p>
//                   <p className="text-3xl font-semibold text-richblack-50">
//                     Rs. {totalAmount}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="rounded-md bg-richblack-800 p-6">
//             {/* Render 3 courses */}
//             <div className="flex items-center justify-between">
//               <p className="text-lg font-bold text-richblack-5">Your Courses</p>
//               <Link to="/dashboard/my-courses">
//                 <p className="text-xs font-semibold text-yellow-50">View All</p>
//               </Link>
//             </div>
//             <div className="my-4 flex items-start space-x-6">
//               {courses.slice(0, 3).map((course) => (
//                 <div key={course._id} className="w-1/3">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.courseName}
//                     className="h-[201px] w-full rounded-md object-cover"
//                   />
//                   <div className="mt-3 w-full">
//                     <p className="text-sm font-medium text-richblack-50">
//                       {course.courseName}
//                     </p>
//                     <div className="mt-1 flex items-center space-x-2">
//                       <p className="text-xs font-medium text-richblack-300">
//                         {course.studentEnrolled.length} students
//                       </p>
//                       <p className="text-xs font-medium text-richblack-300">
//                         |
//                       </p>
//                       <p className="text-xs font-medium text-richblack-300">
//                         Rs. {course.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
//           <p className="text-center text-2xl font-bold text-richblack-5">
//             You have not created any courses yet
//           </p>
//           <Link to="/dashboard/add-course">
//             <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
//               Create a course
//             </p>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Instructor;
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import  InstructorChart  from './InstructorChart';

 const Instructor = () => {
    const {token} = useSelector((state) => state.auth); 
    const {user} = useSelector((state) => state.profile);
    const [loading,setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses,setCourses] = useState([]);

    useEffect(() =>{
       const getCourseDataWithStats = async() =>{
             setLoading(true);
            //  pending
             const instructorApiData = await getInstructorData(token); 

            const result = await fetchInstructorCourses(token);
            // console.log("instructor data",instructorApiData)

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result){
                setCourses(result);
            }
            setLoading(false);
       }

       getCourseDataWithStats();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const totalAmount = instructorData?.reduce((acc,curr) => acc+ curr.totalAmountGenerated,0);
    const totalStudents = instructorData?.reduce((acc,curr) => acc+ curr.totalStudentEnrolled,0);
  return (
   <div className='overflow-x-hidden' >
      <div className='space-y-2 lg:mt-0 md:mt-0 mt-10  '>
        <h1 className='text-2xl font-bold text-richblack-5'>
            Hi {user?.firstName}👋
        </h1>
        <p className='font-medium text-richblack-200'>
            Let's start something new
        </p>
      </div>
      {loading 
      ? (
        <div className=' w-full h-screen flex justify-center items-center '>

            <div className='spinner'></div>
        </div>
    )
      : courses.length > 0
      ?(
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}


            <div className="  min-w-[250px] flex-col rounded-md bg-richblack-800 hidden md:block p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
           
            </div>
          </div>
          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            {/* <div className='flex justify-center'> */}

            <div className="my-4 flex items-start  lg:space-x-6 md:space-x-6 space-x-3 ">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="lg:h-[201px] md:h-[201px] h-[120px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="lg:text-sm md:text-sm text-[8px] font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center lg:space-x-2 md:spaec-x-2 space-x-1">
                      <p className="lg:text-sm md:text-sm text-[8px] font-medium text-richblack-300">
                        {course.studentsEnrolled?.length} students
                      </p>
                      <p className="lg:text-sm md:text-sm text-[8px] font-medium text-richblack-300">
                        |
                      </p>
                      <p className="lg:text-sm md:text-sm text-[8px] font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      )
      :(
        <div className="mt-20 rounded-md bg-richblack-800  py-20 lg:p-6 md:p-6 p-2 lg:mr-0 md:mr-0 mr-7">
            <p className='text-center text-2xl font-bold text-richblack-5'>
                You have not Created any courses yet.
            </p>
            <Link to = {"/dashboard/add-course"}>
            <p className='mt-1 text-center text-lg font-semibold text-yellow-50 '>

            Create a Course
            </p>
            </Link>
        </div>
      )
     }
    </div>
  )
}

export default Instructor