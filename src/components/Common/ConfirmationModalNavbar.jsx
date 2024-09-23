import React from 'react'
import { MdHome } from 'react-icons/md'
import { BiSolidInfoSquare } from 'react-icons/bi'
import { IoIosContact, IoIosContacts } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { GrCatalogOption } from 'react-icons/gr'

export const ConfirmationModalNavbar = ({modalData}) => {
  return (
    <div className='fixed lg:hidden md:hidden inset-0 z-[100]  grid place-items-start  justify-items-end mt-14 overflow-auto transition-colors duration-700   '>
    <div className='w-5/12 h-80 max-w-[350px] rounded-lg border-richblack-400 bg-richblack-800  bg-opacity-95 p-6 transition-colors duration-700'>
    
            <button
            onClick={modalData?.btn7Handler}
            className='text-white mt-0 '
            >
             <RxCross2 size={30} />
            </button>
            <hr className='text-white opacity-20' />
        <div className='flex flex-col items-center gap-y-7 text-richblack-5 font-bold transition-colors duration-700 mt-3 '>
            
        <div className='ml-3 mr-3 flex flex-col gap-y-3'>
            <button   
            onClick={modalData?.btn3Handler}>
              <div className='flex justify-center items-center gap-x-7'>
              <MdHome size={25} />
              {modalData?.btn3Text}
              </div>
            </button>
            <hr className='text-white opacity-20' />
            <button   
            onClick={modalData?.btn4Handler}>
               <div className='flex justify-center items-center gap-x-4'>
              <GrCatalogOption size={20} />
              {modalData?.btn4Text}
              </div>
            </button>
            <hr className='text-white opacity-20' />
            <button   
            onClick={modalData?.btn5Handler}>
              <div className='flex justify-center items-center gap-x-2'>
              <BiSolidInfoSquare size={23} className='' />
              {modalData?.btn5Text}
              </div>
            </button>
            <hr className='text-white opacity-20' />
            <button   
            onClick={modalData?.btn6Handler}>
              <div className='flex justify-center items-center gap-x-2'>
              <IoIosContacts size={35} />
              {modalData?.btn6Text}
              </div>
            </button>
            </div>
           
            </div>
    </div>
</div>
  )
}