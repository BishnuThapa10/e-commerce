import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import blog from '../../assets/images/blog.jpg'
import { FaRegClock } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

export default function BlogSection() {
  return (
    <div className='flex flex-col justify-center items-center p-4 space-y-5'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold'>Top Picks For You</h1>
        <p className='text-xs text-justify text-[#9F9F9F]'>Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>

        <div className='flex flex-col justify-center items-center p-2 gap-2'>
          <div className='md:h-65 md:w-70 h-55 w-60 rounded-md overflow-hidden'>
            <img src={blog} alt="blog" className='w-full  h-full object-cover' />
          </div>
          <p className='text-xs sm:text-sm md:text-base'>Going all-in with millennial design</p>
          <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold text-sm md:text-md border-black cursor-pointer rounded-none inline-flex px-0 py-0">
            Read More
          </Button>
          <div className='flex flex-wrap items-center text-gray-900 gap-4'>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FaRegClock className='h-4 w-4' /> <span>5 min</span>
            </span>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FiCalendar className='h-4 w-4' /> <span>12th Oct 2022</span>
            </span>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center p-2 gap-2'>
          <div className='md:h-65 md:w-70 h-55 w-60 rounded-md overflow-hidden'>
            <img src={blog} alt="blog" className='w-full  h-full object-cover' />
          </div>
          <p className='text-xs sm:text-sm md:text-base'>Going all-in with millennial design</p>
          <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold text-sm md:text-md border-black cursor-pointer rounded-none inline-flex px-0 py-0">
            Read More
          </Button>
          <div className='flex flex-wrap items-center text-gray-900 gap-4'>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FaRegClock className='h-4 w-4' /> <span>5 min</span>
            </span>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FiCalendar className='h-4 w-4' /> <span>12th Oct 2022</span>
            </span>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center p-2 gap-2'>
          <div className='md:h-65 md:w-70 h-55 w-60 rounded-md overflow-hidden'>
            <img src={blog} alt="blog" className='w-full  h-full object-cover' />
          </div>
          <p className='text-xs sm:text-sm md:text-base'>Going all-in with millennial design</p>
          <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold text-sm md:text-md border-black cursor-pointer rounded-none inline-flex px-0 py-0">
            Read More
          </Button>
          <div className='flex flex-wrap items-center text-gray-900 gap-4'>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FaRegClock className='h-4 w-4' /> <span>5 min</span>
            </span>
            <span className='flex items-center space-x-1 md:text-sm text-xs'>
              <FiCalendar className='h-4 w-4' /> <span>12th Oct 2022</span>
            </span>
          </div>
        </div>

      </div>
      <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b-2 border-black font-medium cursor-pointer rounded-none inline-flex px-0">
        View All Post
      </Button>
    </div>
  )
}
