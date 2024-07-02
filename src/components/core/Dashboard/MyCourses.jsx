import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../Common/IconBtn';
import { IoMdAdd } from "react-icons/io";
import CourseTable from "./InstructorCourses/CourseTable"
const MyCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const[courses,setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses()
    },[])
  return (
    <div className='text-white'>
        <div className='flex justify-between'>
            <h1 className='text-3xl'>My Courses</h1>
            <IconBtn
                text="Add Course"
                onclick={()=>navigate("/dashboard/add-course")}
            ><IoMdAdd/></IconBtn>
        </div>
        {
            courses && <CourseTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses