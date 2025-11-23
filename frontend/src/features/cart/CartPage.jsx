import React from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
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
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../lib/priceFormat.js'
import { removeCartItem } from './cartSlice.js'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handelToCheckout = () => {
    if(cart?.length > 0 ){
       nav('/checkout')
    } else{
      toast.error("Your cart is empty")
    }
  }
  return (
    <div>
      <OtherPageHeroSection text="Cart" />

      <div className='flex gap-6 flex-col md:flex-row items-start p-4'>

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
            {cart?.length > 0 ? (cart.map((item, i) => (
              <TableRow>
                <TableCell className='flex gap-4 items-center'>
                  <div className='max-w-20 max-h-20 min-w-10 min-h-10 flex items-center justify-center bg-[#FFF9E5]'>
                    <img src={item.image} alt={item.name} className='max-h-full max-w-full object-cover' />
                  </div>
                  <span className='text-sm text-[#9F9F9F]'>{item.name}</span>
                </TableCell>
                <TableCell className=' text-[#9F9F9F]'>{item.price}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell>
                  {formatPrice(Number(item.price) * Number(item.quantity))}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => dispatch(removeCartItem(i))}
                    className='cursor-pointer'
                  >
                    <AiFillDelete className='text-[#FBEBB5] h-6 w-5' />
                  </button>

                </TableCell>
              </TableRow>
            ))
            ) : (
              <TableRow>
                <TableCell
                  colspan={5}
                  className="text-center py-4 text-gray-500">
                  Your cart is empty
                </TableCell>
              </TableRow>
            )
            }

          </TableBody>
        </Table>



        <div className='bg-[#FFF9E5] flex flex-col justify-start items-center gap-9 w-full  max-w-xs p-4 mx-auto md:mx-0'>
          <h3 className='text-lg font-semibold'>Cart Totals</h3>

          <div className='flex flex-col gap-6 w-full'>

            <div className='flex justify-evenly items-center  gap-2'>
              <sub className='text-sm font-semibold'>Subtotal</sub>
              <sub className=' text-[#9F9F9F]'>
                {formatPrice((cart || []).reduce(
                  (sum, i) => sum + Number(i.price) * Number(i.quantity), 0
                ))}
              </sub>
            </div>

            <div className='flex justify-evenly items-center gap-2'>
              <sub className='text-sm font-semibold'>Total</sub>
              <sub className='text-base font-semibold text-[#B88E2F]'>
                {formatPrice((cart || []).reduce(
                  (sum, i) => sum + Number(i.price) * Number(i.quantity), 0
                ))}
              </sub>
            </div>

            <div className='flex justify-center'>
              <Button type="submit"
                onClick={handelToCheckout}
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
