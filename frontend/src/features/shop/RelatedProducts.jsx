import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { formatPrice } from '../../lib/priceFormat.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { useGetAllProductQuery } from '../product/productApi.js';

export default function RelatedProducts({ relatedTo }) {
  const { isLoading, error, data } = useGetAllProductQuery({ relatedTo, limit: 4 });
  if (isLoading) return <Loader text="Please Wait..." />;
  if (error) return (
    <ErrorMessage message={error.data?.message} />
  );
  return (
    <div className='flex flex-col gap-4 items-center justify-center p-2'>

      <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mx-auto'>Related Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 place-items-center">

        {data && data.furniture.map(({ _id, name, price, images }) => (
          <div key={_id} className='flex flex-col items-center justify-center gap-2 overflow-hidden max-w-xs w-full h-60'>
            <div className='w-full md:h-[80%] overflow-hidden'>
              <img src={images[0].url} alt={name} className='w-full h-full object-cover object-center hover:scale-105 transition-all duration-300' />
            </div>
            <div className='flex flex-col justify-between h-[20%]'>
              <p className='text-xs md:text-sm font-medium text-left line-clamp-2'>{name}</p>
              <p className='text-sm md:text-base font-semibold text-left'>{formatPrice(price)}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        // onClick={() =>
        //   nav(`/search?relatedTo=${relatedTo}`)
        // }
        className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold border-black cursor-pointer rounded-none inline-flex px-0">
        View More
      </Button>
    </div>
  )
}
