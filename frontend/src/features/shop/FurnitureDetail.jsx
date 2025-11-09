import React, { useState } from 'react'
import asgardSofa from '../../assets/images/asgaardSofa.png'
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { RxDividerVertical } from "react-icons/rx";
import SizeSelector from './SizeSelector.jsx';
import ColorSelection from './ColorSelection.jsx';
import { Button } from '../../components/ui/button.jsx';
import AddToCart from '../cart/AddToCart.jsx';
import FurnitureIdSection from './FurnitureIdSection.jsx';


export default function FurnitureDetail() {
  const value = 3.5;
  const starSize = 24;
  const maxStars = 5;
  const ratingWidth = starSize * value;
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Blue");
  // console.log("Adding to cart:", {
  //     size: selectedSize,
  //     color: selectedColor
  //   });
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 px-4 sm:px-15 py-2 gap-y-4 md:gap-y-10 gap-x-20 overflow-hidden border-b border-b-[#D9D9D9]'>

      <div className="flex w-full">
        <div className='w-full h-full flex items-center justify-center bg-[#FFF9E5]'>
          <img src={asgardSofa} alt="asgardSofa" className='max-h-[300px] max-w-full object-cover' />
        </div>
      </div>

      <div className='flex flex-col gap-4'>

        <div className='space-y-1'>
          <h3 className='text-xl sm:text-2xl md:text-3xl font-medium'>Asgaard sofa</h3>
          <p className='text-sm sm:md md:text-xl font-semibold text-[#9F9F9F]'>Rs. 25,000.00</p>
        </div>

        <div className=' inline-flex gap-2 items-center'>

          <div style={{ width: ratingWidth }} className='overflow-hidden shrink-0'>
            <Rating
              style={{ width: starSize * maxStars }}
              readOnly
              value={value}
              precision={0.5}
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: "#facc15",
                inactiveFillColor: "transparent", // hide unfilled stars
              }}
            />
          </div>

          <div className='flex items-center justify-between sm:gap-2 gap-1'>
            <RxDividerVertical className='h-7 w-7 text-[#9F9F9F]' />
            <span className='text-xs text-[#9F9F9F]'>5 Customer Review</span>
          </div>

        </div>

        <p className='text-xs max-w-100'>Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.
        </p>

        <div className='flex flex-col gap-2'>
          <span className='text-xs text-[#9F9F9F]'>Size</span>
          <SizeSelector selectedSize={selectedSize} onSelectSize={setSelectedSize} />
        </div>

        <div className='flex flex-col gap-2'>
          <span className='text-xs text-[#9F9F9F]'>Color</span>
          <ColorSelection selectedColor={selectedColor} onSelectColor={setSelectedColor} />
        </div>

        <div>
          <AddToCart />
        </div>

      </div>
      <FurnitureIdSection/>
    </div>
  )
}
