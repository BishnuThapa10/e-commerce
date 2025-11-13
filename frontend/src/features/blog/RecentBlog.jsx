import React from 'react'
import blog from '../../assets/images/blog.jpg'

export default function RecentBlog() {
  return (
    <div className='flex flex-col gap-4'>

      <p className='text-md font-semibold'>Recent Posts</p>

      <div className='grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2'>
        <div className=' h-15  w-15 overflow-hidden rounded-md row-span-2'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>
        <span className='text-sm font-semibold'>Going all-in with millennial design</span>
        <span className='text-xs text-[#9F9F9F]'>03 Aug 2022</span>
      </div>

      <div className='grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2'>
        <div className=' h-15  w-15 overflow-hidden rounded-md row-span-2'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>
        <span className='text-sm font-semibold'>Going all-in with millennial design</span>
        <span className='text-xs text-[#9F9F9F]'>03 Aug 2022</span>
      </div>

      <div className='grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2'>
        <div className=' h-15  w-15 overflow-hidden rounded-md row-span-2'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>
        <span className='text-sm font-semibold'>Going all-in with millennial design</span>
        <span className='text-xs text-[#9F9F9F]'>03 Aug 2022</span>
      </div>

    </div>
  )
}
