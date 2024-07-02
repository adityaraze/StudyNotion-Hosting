import React, { useEffect, useState } from 'react'
import Footer from '../components/Common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    const [active, setActive] = useState(1)
    // fetch all category
    useEffect(()=>{
        const getCategories = async()=>{
            const res = await apiConnector("GET",categories.CATEGORIES_API);
            const category_id = res?.data?.allTags?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()=== catalogName)[0]._id;
            console.log("Category Id : ",category_id )
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName])

    useEffect(()=>{
        const getCategoryDetails = async() =>{
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("res",res);
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error)
            }
        }
        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])
  return (
    <div className='text-white'>
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
        
            {/* section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-[30px] text-[#F1F2FF]">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm gap-x-4">
                    <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
                    >Most Popular</p>
                    <p
                    className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
                    >New</p>
                    </div>
                    <div>
                    <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.course}/>
                    </div>
            </div>
            {/* section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-[30px] text-[#F1F2FF]">Top Courses {catalogPageData?.data?.selectedCategory?.name}</div>
                {/* <p>Top Courses</p> */}
                <div className="py-8">
                <CourseSlider Courses = {catalogPageData?.data?.differentCategory?.course}/>
                </div>
            </div>
            {/* section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-[30px] text-[#F1F2FF]">Frequently Braught</div>
                <div className='py-8'>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {
                    catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                        <Course_Card course = {course} key = {index} Height = {"h-[400px]"}/>
                    ))
                }
                </div>
                </div>
            </div>
        <Footer/>
    </div>
  )
}

export default Catalog