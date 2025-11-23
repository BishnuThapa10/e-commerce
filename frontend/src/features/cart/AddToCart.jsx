import React, { useState } from 'react'
import { Button } from '../../components/ui/button.jsx';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../../components/ui/sheet.jsx';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, setCart } from './cartSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { formatPrice } from '../../lib/priceFormat.js';
import { getAutUser } from '../../lib/auth.js';

export default function AddToCart({ furniture, size, color }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);
  const isExist = cart.find((item) => item.id === furniture._id);
  const [quantity, setQuantity] = useState(isExist ? isExist.quantity : 1);
  const [open, setOpen] = useState(false);

  const handelAdd = () => {
    const user = getAutUser();
    if (!user) {
      toast.error("You have to login to access this feature");
      nav('/account');
      return;
    }

    if (user?.role === 'admin') {
      toast.error("Admin can't perform this action", { id: "admin-error" });
      return;
    }

    dispatch(setCart({
      id: furniture._id,
      name: furniture.name,
      price: furniture.price,
      image: furniture.images[0].url,
      color,
      size,
      quantity
    }));
    setOpen(true);
  }

  const handelToCheckout = () => {
    if (cart?.length > 0) {
      nav('/checkout')
    } else {
      toast.error("Your cart is empty")
    }
  }
  return (
    <div className='inline-flex gap-2'>

      <div className="inline-flex rounded-sm overflow-hidden border items-center py-0">
        <Button
          size="sm"
          variant="ghost"
          className="rounded-none hover:bg-gray-100"
          disabled={quantity <= 1}
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
        >
          -
        </Button>

        <div className=" text-center p-1 text-xs select-none">{quantity}</div>

        <Button
          size="sm"
          variant="ghost"
          className="rounded-none px-3 hover:bg-gray-100"
          onClick={() => setQuantity(q => Math.min(furniture.stock, q + 1))}
        // Math.min(maxStock, quantity + 1).
        >
          +
        </Button>
      </div>

      <Button variant="outline"
        className="border-black text-xs px-8"
        onClick={handelAdd}>Add To Cart</Button>

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side="right" className="w-full max-w-sm flex flex-col h-[92vh]">
          <SheetHeader className="relative">
            <HiOutlineShoppingBag
              className="absolute top-1 right-2  w-8 h-8 text-gray-500 pointer-events-none"
            />
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription className="border-b border-b-[#D9D9D9] ml-0 mr-15 mt-2"></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col flex-1 overflow-y-auto justify-between items-start px-4">
            <div className={`flex flex-col gap-2 ${cart?.length > 0 ? 'items-start' : 'w-full items-center'} `}>

              {cart?.length > 0 ? (cart.map((item, i) => (
                <div key={item.id} className='flex gap-5 items-center'>

                  <div className='max-w-20 max-h-20 flex items-center justify-center bg-[#FFF9E5]'>
                    <img src={item.image} alt={item.name} className='max-h-full max-w-full object-cover' />
                  </div>

                  <div className='inline-flex flex-col'>
                    <span className='text-sm'>{item.name}</span>
                    <span className='text-xs inline-flex gap-3'><span>{item.quantity}</span> x <span className='text-[#B88E2F]'>{formatPrice(item.price)}</span></span>
                  </div>
                  <button
                    onClick={() => dispatch(removeCartItem(i))}
                    className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent text-[#9F9F9F]"
                  >
                    <IoCloseCircle className="w-full h-full" />
                  </button>

                </div>
              ))
              ) : (
                <p className="text-center py-4 text-gray-500">Your cart is empty </p>
              )
              }

            </div>

            <div className='flex items-center space-x-18'>
              <p className='text-sm'>Sub total</p>
              <span className='text-[#B88E2F] text-sm'>
                {formatPrice((cart || []).reduce(
                  (sum, i) => sum + Number(i.price) * Number(i.quantity), 0
                ))}
              </span>
            </div>
          </div>

          <SheetFooter className="shrink-0 border-t border-t-[#D9D9D9]">
            <div className='flex gap-6'>
              <Button variant="outline"
                onClick={() => nav('/cart')}
                className="px-8 h-7 border-black text-xs rounded-full">View Cart</Button>
              <Button variant="outline"
                onClick={handelToCheckout}
                className="px-8 h-7 border-black text-xs rounded-full">Checkout</Button>
            </div>

          </SheetFooter>
        </SheetContent>
      </Sheet>

    </div>
  )
}
