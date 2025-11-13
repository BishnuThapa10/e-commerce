import React from 'react'
import { Input } from '../../components/ui/input.jsx'
import { InputGroup } from '../../components/ui/input-group.jsx'
import { SearchIcon } from 'lucide-react'
import { InputRightElement } from '../../components/ui/InputRightElement.jsx'

export default function SearchAndCategory() {
  return (
    <div className='flex flex-col gap-2'>

      <InputGroup>
        <Input placeholder="Search..." className="pr-10" style={{
          outline: "none",
          boxShadow: "none"
        }} />
        <InputRightElement>
          <SearchIcon className="h-4 w-4" />
        </InputRightElement>
      </InputGroup>

      <div className='p-2 flex flex-col gap-4'>

        <h3>Categories</h3>

        <div className='flex justify-between text-xs text-[#9F9F9F]'>
          <span>Crafts</span>
          <span>2</span>
        </div>

        <div className='flex justify-between text-xs text-[#9F9F9F]'>
          <span>Design</span>
          <span>8</span>
        </div>

        <div className='flex justify-between text-xs text-[#9F9F9F]'>
          <span>Handmade</span>
          <span>7</span>
        </div>

        <div className='flex justify-between text-xs text-[#9F9F9F]'>
          <span>Interior</span>
          <span>1</span>
        </div>

        <div className='flex justify-between text-xs text-[#9F9F9F]'>
          <span>Wood</span>
          <span>8</span>
        </div>
      </div>

    </div>
  )
}
