import React, { useState } from 'react'
import asgardSofa from '../../assets/images/asgaardSofa.png'
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { RxDividerVertical } from "react-icons/rx";
import SizeSelector from './SizeSelector.jsx';
import ColorSelection from './ColorSelection.jsx';
import AddToCart from '../cart/AddToCart.jsx';
import FurnitureIdSection from './FurnitureIdSection.jsx';
import TabSection from './TabSection.jsx';
import FourItemList from '../../components/website/FourItemList.jsx';
import { useGetSingleItmeQuery } from '../product/productApi.js';
import { useParams } from 'react-router';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { formatPrice } from '../../lib/priceFormat.js';


export default function FurnitureDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleItmeQuery(id);
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

  if (isLoading) return <Loader text="Please Wait..." />;
  if (error) return (
    <ErrorMessage message={error.data?.message} />
  );
  console.log(data);
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 px-4 sm:px-15 py-2 gap-y-4 md:gap-y-10 gap-x-20 overflow-hidden border-b border-b-[#D9D9D9]'>

        <div className="flex w-full">
          <div className='w-full h-full flex items-center justify-center bg-[#FFF9E5]'>
            <img src={data.furniture.images[0].url} alt={data.furniture.name} className='max-h-[300px] max-w-full object-cover' />
          </div>
        </div>

        <div className='flex flex-col gap-4'>

          <div className='space-y-1'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-medium'>{data.furniture.name}</h3>
            <p className='text-sm sm:md md:text-xl font-semibold text-[#9F9F9F]'>{formatPrice(data.furniture.price)}</p>
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

          <p className='text-xs max-w-100 line-clamp-3'>{data.furniture.description}
          </p>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-[#9F9F9F]'>Size</span>
            <SizeSelector sizes={data.furniture.size} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-[#9F9F9F]'>Color</span>
            <ColorSelection colors={data.furniture.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          </div>

          <div>
            <AddToCart furniture={data.furniture} color={selectedColor} size={selectedSize}/>
          </div>

        </div>
        <FurnitureIdSection furniture={data.furniture}/>
      </div>

      <TabSection furniture={data.furniture}/>

      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold'>Related Products</h1>
      </div>
      <FourItemList />

    </div>
  )
}
