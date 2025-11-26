import React from 'react'
import { Link } from 'react-router'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'

export default function Footer() {
  return (
    <footer className='p-5 pb-2'>

      <div className='p-0 flex flex-col space-y-4'>

        <div className='grid grid-rows-1 md:grid-cols-3 gap-6 md:gap-0'>

          <p className='place-self-center text-sm text-gray-500'>400 University Drive Suite 200 Coral <br />
            Gables,<br />
            FL 33134 USA</p>

          <div className='flex justify-evenly'>

            <div className='flex flex-col gap-4 items-start'>
              <h3 className='text-sm text-gray-500'>Links</h3>
              <ul className="flex flex-col gap-2">
                <li><Link to="/" className="hover:underline text-xs font-semibold">Home</Link></li>
                <li><Link to="/shop" className="hover:underline text-xs font-semibold">Shop</Link></li>
                <li><Link to="/about" className="hover:underline text-xs font-semibold">About</Link></li>
                <li><Link to="/contact" className="hover:underline text-xs font-semibold">Contact</Link></li>
              </ul>
            </div>

            <div className='flex flex-col gap-4 items-start'>
              <h3 className='text-sm text-gray-500'>Help</h3>
              <ul className="flex flex-col gap-2">
                <li><Link to="#" className="hover:underline text-xs font-semibold">Payment Options</Link></li>
                <li><Link to="#" className="hover:underline text-xs font-semibold">Returns</Link></li>
                <li><Link to="#" className="hover:underline text-xs font-semibold">Privacy Pollicies</Link></li>
              </ul>
            </div>

          </div>

          <div className='flex flex-col gap-4 items-center md:items-start'>
            <h3 className='text-sm text-gray-500'>Newsletter</h3>

            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Enter Your Email Address" className=" text-xs placeholder:text-xs border-0 border-black border-b px-0 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-black" />

              <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b font-semibold border-black cursor-pointer rounded-none inline-flex px-0 text-xs">
                SUBSCRIBE
              </Button>

            </div>

          </div>

        </div>

        <div className='border-t border-gray-400 pt-4 pb-0'>
          <span className='text-xs sm:text-sm'>2022 Meubel House. All rights reverved</span>
        </div>

      </div>

    </footer>
  )
}
