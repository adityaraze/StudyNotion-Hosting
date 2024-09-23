import React, { useState } from 'react'

import  {SidebarLink}  from "../core/Dashboard/SidebarLink"
import { sidebarLinks } from '../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import { VscSignOut } from 'react-icons/vsc'

export const DashbarModal = ({setConfirmationModall,setConfirmationModal}) => {
  const {user,loading:profileLoading} = useSelector((state) => state.profile);
  const {loading:authLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const [ConfirmationModals,setConfirmationModal] = useState(null);
    return (
      <div>
        <button  onClick={()=> setConfirmationModall(false)}>

        <div className='fixed lg:hidden md:hidden inset-0 z-[100]  grid place-items-start  justify-items-start mt-14 overflow-auto transition-all  ease-out  duration-700   '>
 
        <div className='   flex-col border-r-[1px] border-r-richblack-700
         lg:h-[calc(100vh-3.5rem)] h-full  bg-richblack-800 py-10 md:mr-2  bg-opacity-95  transition-all duration-700'>
  
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
    
        </div>
        </button>
      </div>
 

    
      )
}