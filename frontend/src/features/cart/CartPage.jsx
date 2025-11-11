import React from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import asgardSofa from '../../assets/images/asgaardSofa.png'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AiFillDelete } from "react-icons/ai";
import { Button } from '../../components/ui/button.jsx'

export default function CartPage() {
  return (
    <div>
      <OtherPageHeroSection text="Cart" />

      <div className='flex gap-6 flex-col md:flex-row p-4'>

        <Table className="[&_thead_tr]:border-b-0 [&_tbody_tr]:border-b-0 [&_tr:hover]:bg-transparent text-sm">
          <TableHeader className="bg-[#FFF9E5]">
            <TableRow>
              <TableHead className="font-semibold text-center">Product</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold text-center">Quantity</TableHead>
              <TableHead className="font-semibold">Subtotal</TableHead>
              <TableHead className="font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='flex gap-4 items-center'>
                <div className='max-w-20 max-h-20 min-w-10 min-h-10 flex items-center justify-center bg-[#FFF9E5]'>
                  <img src={asgardSofa} alt="asgardSofa" className='max-h-full max-w-full object-cover' />
                </div>
                <span className='text-sm text-[#9F9F9F]'>Asgard sofa</span>
              </TableCell>
              <TableCell className=' text-[#9F9F9F]'>Rs.2500000</TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell>Rs.2500000</TableCell>
              <TableCell><AiFillDelete className='text-[#FBEBB5] h-6 w-5' /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='flex gap-4 items-center'>
                <div className='max-w-20 max-h-20 flex items-center justify-center bg-[#FFF9E5]'>
                  <img src={asgardSofa} alt="asgardSofa" className='max-h-full max-w-full object-cover' />
                </div>
                <span className='text-sm text-[#9F9F9F]'>Asgard sofa</span>
              </TableCell>
              <TableCell className=' text-[#9F9F9F]'>Rs.2500000</TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell>Rs.2500000</TableCell>
              <TableCell><AiFillDelete className='text-[#FBEBB5] h-6 w-5' /></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className='bg-[#FFF9E5] flex flex-col justify-start items-center gap-9 w-full  max-w-xs p-4 mx-auto md:mx-0'>
          <h3 className='text-lg font-semibold'>Cart Totals</h3>

          <div className='flex flex-col gap-6 w-full'>

            <div className='flex justify-evenly items-center  gap-2'>
              <sub className='text-sm font-semibold'>Subtotal</sub>
              <sub className=' text-[#9F9F9F]'>Rs.2500000</sub>
            </div>

            <div className='flex justify-evenly items-center gap-2'>
              <sub className='text-sm font-semibold'>Total</sub>
              <sub className='text-base font-semibold text-[#B88E2F]'>Rs.2500000</sub>
            </div>

            <div className='flex justify-center'>
              <Button type="submit"
                variant="outline"
                className="border-black text-sm px-9 bg-transparent hover:bg-transparent"
              >Check Out</Button>
            </div>
          </div>

        </div>

      </div>

      <PolicySection />
    </div>
  )
}
