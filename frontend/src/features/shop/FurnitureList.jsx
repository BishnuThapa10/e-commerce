import React from 'react'
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { PiCirclesFourFill } from "react-icons/pi";
import { BsViewList } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select.jsx';
import mirror from '../../assets/images/mirror.png'
import { useNavigate } from 'react-router';

export default function FurnitureList() {
  const nav = useNavigate()
  return (
    <div className='p-0'>

      {/* Header section for list */}
      <div className='px-16 py-2 bg-[#FAF4F4] flex justify-between items-center sm:flex-row flex-col space-y-2 sm:space-y-0 overflow-hidden gap-1'>
        <div className='flex gap-2 sm:gap-4 items-center'>

          <div className=' flex items-center sm:gap-2 gap-1'>
            <HiOutlineAdjustmentsHorizontal className='h-4 w-4' />
            <span className='text-xs'>Filter</span>
          </div>

          <PiCirclesFourFill className='h-4 w-4' />
          <BsViewList className='h-4 w-4' />

          <div className='flex items-center justify-between sm:gap-2 gap-1'>
            <RxDividerVertical className='h-7 w-7 text-[#9F9F9F]' />
            <span className='text-xs'>Showing 1-16 of 32 results</span>
          </div>

        </div>
        <div className='flex sm:gap-2 gap-1 items-center'>

          <div className='flex items-center sm:gap-2 gap-1'>
            <span className='sm:text-sm text-xs'>Show</span>
            <Select defaultValue="16">
              <SelectTrigger className="w-[65px] bg-[#FFFFFF] rounded-none text-[#9F9F9F]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center sm:gap-2 gap-1'>
            <span className='sm:text-sm text-xs'>Sort by</span>
            <Select defaultValue="none">
              <SelectTrigger className="w-[120px] bg-[#FFFFFF] rounded-none text-[#9F9F9F]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="none">Default</SelectItem>
                  <SelectItem value="price">Price ↑</SelectItem>
                  <SelectItem value="-price">Price ↓</SelectItem>
                  <SelectItem value="title">Title A → Z</SelectItem>
                  <SelectItem value="-title">Title Z → A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-8">

        <div className='flex flex-col items-center justify-center gap-2 overflow-hidden' onClick={() => nav(`/furniture`)}>
          <div>
            <img src={mirror} alt="" className='w-full h-full object-cover object-center' />
          </div>
          <p className='text-xs md:text-sm'>Plain console with teak mirror</p>
          <p className='text-sm font-semibold'>Rs. 25,000.00</p>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 overflow-hidden'>
          <div>
            <img src={mirror} alt="" className='w-full h-full object-cover object-center' />
          </div>
          <p className='text-xs md:text-sm'>Plain console with teak mirror</p>
          <p className='text-sm font-semibold'>Rs. 25,000.00</p>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 overflow-hidden'>
          <div>
            <img src={mirror} alt="" className='w-full h-full object-cover object-center' />
          </div>
          <p className='text-xs md:text-sm'>Plain console with teak mirror</p>
          <p className='text-sm font-semibold'>Rs. 25,000.00</p>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 overflow-hidden'>
          <div>
            <img src={mirror} alt="" className='w-full h-full object-cover object-center' />
          </div>
          <p className='text-xs md:text-sm'>Plain console with teak mirror</p>
          <p className='text-sm font-semibold'>Rs. 25,000.00</p>
        </div>

      </div>
    </div>
  )
}
