import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../Common/IconBtn';
import {GrAddCircle} from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux';
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
const CourseBuilderForm = () => {
    const{register,handleSubmit,setValue,formState:{errors}} = useForm();
    const [editSectionName,setEditSectionName] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const cancelEdit = ()=>{
        setEditSectionName(null);
        setValue("sectionName","");
    }
    const goBack = ()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    const goToNext = ()=>{
        if(course?.courseContent?.length === 0){
            toast.error("Atleast Add One Section");
            return;
        }
        if(course?.courseContent?.some((section)=>section?.subSection?.length === 0)){
            toast.error("Please Add At Least One Lecture In Section")
            return;
        }
        // if every thing is okey then go to next step
        dispatch(setStep(3));
    }
    const onSubmit = async(data)=>{
        setLoading(true)
        let result
        if(editSectionName){
            result = await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionName,
                    courseId:course._id
                },token
            )
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
        }

        //update values
        if(result){
            dispatch(setCourse(result))
            setEditSectionName(null);
            setValue("sectionName","")
        }

        setLoading(false)
    }
    const handleChangeEditSectionName = (sectionId,sectionName)=>{
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId)
        setValue("sectionName",sectionName);
    }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor='sectionName' className="text-sm text-richblack-5">Section Name<sup className="text-pink-200">*</sup></label>
                <input
                    id='sectionName'
                    placeholder='Add Section Name'
                    {...register("sectionName",{required:true})}
                    className='w-full form-style'
                />
                {
                    errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name Is Required</span>
                    )
                }
            </div>
            <div className="flex items-end gap-x-4">
                <IconBtn
                type="Submit"
                text={editSectionName ? "Edit Section Name" : "Add Section"}
                outline={true}
                customClasses={"text-white"}
                >
                <GrAddCircle color='yellow' className="text-yellow-50"/>
                </IconBtn>
                {
                    editSectionName && (
                        <button
                        type='button'
                        onClick={cancelEdit}
                        className="text-sm text-richblack-300 underline"
                        >
                        Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>
        {
            course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )
        }
        <div className="flex justify-end gap-x-3">
            <button
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >Back</button>
            <IconBtn
            text="Next"
            onclick={goToNext}
            >
            <BiRightArrow/>
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm
