import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../Pages/Spinner';
import {SidebarLink} from './SidebarLink';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'
import { DashbarModal } from '../../Common/DashbarModal'
import ConfirmationModal from "../../Common/ConfirmationModal"
const Sidebar = () => {
  const {user,loading:profileLoading} = useSelector((state) => state.profile);
  const {loading:authLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ConfirmationModals,setConfirmationModal] = useState(null);
  const value = false
  const [ConfirmationModall,setConfirmationModall] = useState(value);
  const setThevalue = (value) =>{
    if(value === false){
       setConfirmationModall(true);
    }
    else if(value === true){
    setConfirmationModall(false);
    }
 }
  const[ConfirmationModalInstr,setConfirmationModalInstr] = useState(false);
  if(profileLoading || authLoading){
      return (
          <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
          <div className='spinner'>Loading...</div>
         </div>
      )
  }
  return (
    <div className='relative'> 

        <div className='h-4 w-2 ' >
  <button className=" ml-1    md:hidden lg:hidden w-4    "
   onClick={() => setThevalue(value)}   
>
            <AiOutlineMenu fontSize={30} fill="#AFB2BF"   />
          </button>
        </div>
        <div className=' hidden md:block  flex-col border-r-[1px] border-r-richblack-700
         lg:h-[calc(100vh-3.5rem)]  bg-richblack-800 py-10 md:mr-2'>

          <div className='  flex flex-col  '>
            {
                sidebarLinks.map((link) =>{
                   if(link.type && user?.accountType !== link.type) return null;
                   return (
                    <SidebarLink key={link.id} link={link} iconName ={link.icon}></SidebarLink>
                   )
                    
                })
            }
          </div>
          <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

          <div className='flex flex-col'>
            <SidebarLink 
            link = {{name:"Settings",path:"dashboard/settings"}}
            iconName = "VscSettingsGear"
            />

            <button
            onClick={() => setConfirmationModal({
                text1:"Are Your Sure ?",
                text2:"You will be logged out of your Account",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler:() => dispatch(logout(navigate)),
                btn2Handler:() => setConfirmationModal(null),
            })}

            className=' px-8 py-2 text-sm font-medium text-richblack-300'

            >
              <div className='flex flex-row items-center  gap-x-2'>
              <VscSignOut className='text-lg' />
              <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        
        {ConfirmationModals && <ConfirmationModal modalData ={ConfirmationModals}></ConfirmationModal> }
        {ConfirmationModall && <DashbarModal setConfirmationModall = {setConfirmationModall} setConfirmationModal={setConfirmationModal}></DashbarModal> }
        {/* {ConfirmationModalInstr && (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ) && <InstructorModal setConfirmationModalInstr = {setConfirmationModalInstr}></InstructorModal> } */}


           
    </div>
  )
}

export default Sidebar