import React from 'react'
import blog from '../../assets/images/blog.jpg'
import { IoPerson } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { Button } from '../../components/ui/button.jsx';

export default function BlogList() {
  return (
    <div className='flex flex-col gap-8'>

      <div className='flex flex-col max-w-xl w-full gap-1'>

        <div className='max-w-xl min-h-50 aspect-17/9 w-full overflow-hidden rounded-sm'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>

        <div className='flex gap-2 text-xs text-[#9F9F9F]'>

          <div className='flex gap-1 items-center'>
            <IoPerson />
            <span>Admin</span>
          </div>

          <div className='flex gap-1 items-center'>
            <IoCalendarClear />
            <span>14 Oct 2022</span>
          </div>
          <div className='flex gap-1 items-center'>
            <FaTag />
            <span>Wood</span>
          </div>

        </div>

        <h3>Going all-in with millennial design</h3>

        <p className='text-xs text-[#9F9F9F] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

        <div>
          <Button variant="ghost"
            // onClick={() => nav(`/blog`)}
            className="hover:bg-transparent focus:bg-transparent border-b-2 border-black font-medium cursor-pointer rounded-none inline-flex px-0">
            Read More
          </Button>
        </div>

      </div>

      <div className='flex flex-col max-w-xl w-full gap-1'>

        <div className='max-w-xl min-h-50 aspect-17/9 w-full overflow-hidden rounded-sm'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>

        <div className='flex gap-2 text-xs text-[#9F9F9F]'>

          <div className='flex gap-1 items-center'>
            <IoPerson />
            <span>Admin</span>
          </div>

          <div className='flex gap-1 items-center'>
            <IoCalendarClear />
            <span>14 Oct 2022</span>
          </div>
          <div className='flex gap-1 items-center'>
            <FaTag />
            <span>Wood</span>
          </div>

        </div>

        <h3>Going all-in with millennial design</h3>

        <p className='text-xs text-[#9F9F9F] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

        <div>
          <Button variant="ghost"
            // onClick={() => nav(`/blog`)}
            className="hover:bg-transparent focus:bg-transparent border-b-2 border-black font-medium cursor-pointer rounded-none inline-flex px-0">
            Read More
          </Button>
        </div>

      </div>

      <div className='flex flex-col max-w-xl w-full gap-1'>

        <div className='max-w-xl min-h-50 aspect-17/9 w-full overflow-hidden rounded-sm'>
          <img src={blog} alt="blog" className='w-full  h-full object-cover' />
        </div>

        <div className='flex gap-2 text-xs text-[#9F9F9F]'>

          <div className='flex gap-1 items-center'>
            <IoPerson />
            <span>Admin</span>
          </div>

          <div className='flex gap-1 items-center'>
            <IoCalendarClear />
            <span>14 Oct 2022</span>
          </div>
          <div className='flex gap-1 items-center'>
            <FaTag />
            <span>Wood</span>
          </div>

        </div>

        <h3>Going all-in with millennial design</h3>

        <p className='text-xs text-[#9F9F9F] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

        <div>
          <Button variant="ghost"
            // onClick={() => nav(`/blog`)}
            className="hover:bg-transparent focus:bg-transparent border-b-2 border-black font-medium cursor-pointer rounded-none inline-flex px-0">
            Read More
          </Button>
        </div>

      </div>

    </div>
  )
}
