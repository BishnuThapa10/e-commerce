import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GoHeart } from "react-icons/go";

export default function FurnitureIdSection() {
  return (
    <div className="flex gap-2 md:gap-20 col-start-1 md:col-start-2 border-t border-t-[#D9D9D9] py-6">

      <div className='grid grid-cols-[max-content_max-content_max-content] gap-x-2 gap-y-3'>
        <span className='text-xs text-[#9F9F9F]'>SKU</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>SSOO1</span>

        <span className='text-xs text-[#9F9F9F]'>Category</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>Sofas</span>

        <span className='text-xs text-[#9F9F9F]'>Tags</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>Sofa, Chair, Home, Shop</span>

        <span className='text-xs text-[#9F9F9F]'>Share</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='inline-flex gap-4 text-sm text-black'><FaFacebook /> <FaLinkedin /> <AiFillTwitterCircle /></span>

      </div>

      <span className='inline-flex items-end gap-4 text-3xl text-pink-500'><GoHeart /></span>
    </div>
  )
}
