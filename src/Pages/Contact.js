
import React from 'react'

import { ContactDetails } from '../components/ContactPage/ContactDetails';
import  {ContactForm}  from '../components/ContactPage/ContactForm';
import  Footer  from '../components/Common/Footer';
import  ReviewSlider  from '../components/Common/ReviewSlider';
import  {ReviewSlider1}  from '../components/Common/ReviewSlider1';
export const Contact = () => {
  return (
    
     <div>
      <div className='mx-auto mt-20 flex  w-11/12 max-w-maxContentTab lg:max-w-maxContent justify-between gap-10 text-white lg:flex-row flex-col'>
          {/* contact Details */}
          <div className='lg:w-[40%] '>
            <ContactDetails></ContactDetails>
          </div>

          {/* contact form */}
          <div className='lg:w-[60%]'>
            <ContactForm></ContactForm>
          </div>
        </div>

        <div className='relative mx-auto my-20 flex flex-col w-11/12 max-w-maxContent items-center justify-between gap-8 bg-richblack-900 text-white'>
          <h1 className='text-center lg:text-4xl md:text-3xl text-3xl font-semibold mt-8'>
          Reviews from other learners
          </h1>
         {/* reviewa slider here */}
         <div className='hidden md:block mb-2 lg:w-full md:w-[800px]'>

          <ReviewSlider/>
         </div>
         <div className='lg:hidden md:hidden'>
          <ReviewSlider1/>
         </div>
        </div>
        <Footer></Footer>
       </div>

  )
}
