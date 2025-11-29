import React from 'react'

export default function AdditionalInfo({ furniture }) {
  const { name, category, roomType, stock, createdAt, updatedAt } = furniture;
  return (
    <div>
      <div className='grid grid-cols-[max-content_max-content_max-content] gap-x-2 gap-y-3'>
        <span className='text-xs text-[#9F9F9F]'>Name</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{name}</span>

        <span className='text-xs text-[#9F9F9F]'>Category</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{category}</span>

        <span className='text-xs text-[#9F9F9F]'>Tags</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{category}, {roomType}</span>

        <span className='text-xs text-[#9F9F9F]'>Stock</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{stock} units available</span>

        <span className='text-xs text-[#9F9F9F]'>Created At</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{new Date(createdAt).toLocaleDateString()}</span>

        <span className='text-xs text-[#9F9F9F]'>Last Updated</span>
        <span className='text-xs text-[#9F9F9F]'>:</span>
        <span className='text-xs text-[#9F9F9F]'>{new Date(updatedAt).toLocaleDateString()}</span>

      </div>
    </div>
  )
}
