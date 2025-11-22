import React from 'react'
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { PiCirclesFourFill } from "react-icons/pi";
import { BsViewList } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select.jsx';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetAllProductQuery } from '../product/productApi.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { Button } from '../../components/ui/button.jsx';
import { formatPrice } from '../../lib/priceFormat.js';

export default function FurnitureList() {
  const [sortParams, setSortParams] = useSearchParams();
  const page = Number(sortParams.get("page") || 1);
  const sort = sortParams.get("sort") || "none";
  const limit = Number(sortParams.get("limit") || 8)
  const nav = useNavigate();
  const { isLoading, error, data } = useGetAllProductQuery({ page, sort, limit, fields: 'name,price,images' });
  if (isLoading) return <Loader text="Please Wait..." />;
  if (error) return (
    <ErrorMessage message={error.data?.message} />
  );

  const startItem = (page - 1) * limit + 1; // first item on the page
  const endItem = Math.min(page * limit, data.totalItems); // last item on the page, cannot exceed totalItems
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
            <span className='text-xs'>Showing {startItem}-{endItem} of {data.totalItems} results</span>
          </div>

        </div>
        <div className='flex sm:gap-2 gap-1 items-center'>

          <div className='flex items-center sm:gap-2 gap-1'>
            <span className='sm:text-sm text-xs'>Show</span>
            <Select
              value={String(limit)}
              onValueChange={(e) => (setSortParams({ page: 1, limit: e }))} // reset to page 1 
            >
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
            <Select
              value={sort}
              onValueChange={(e) => (setSortParams({ page: 1, sort: e }))} // reset to page 1 when sorting
            >
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-8 place-items-center">

        {data && data.furniture.map(({ _id, name, price, images }) => {
          return <div key={_id}
            className='flex flex-col bg-white items-center justify-center gap-2 overflow-hidden max-w-xs w-full h-60'
          onClick={() => nav(`/furniture/${_id}`)}
          >
            <div className='w-full md:h-[80%] overflow-hidden'>
              <img src={images[0].url} alt={name} className='w-full h-full object-cover object-center hover:scale-105 transition-all duration-300' />
            </div>

            <div className='flex flex-col justify-between h-[20%]'>
              <p className='text-xs md:text-sm font-medium text-left line-clamp-2'>{name}</p>
              <p className='text-sm md:text-base font-semibold text-left'>{formatPrice(price)}</p>
            </div>

          </div>
        })}

      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        {/* Always show first page */}
        <Button
          onClick={() => setSortParams({ page: 1, sort })}
          size="icon"
          className={`text-xs text-black rounded-md ${page === 1 ? "bg-[#FBEBB5] hover:bg-[#FBEBB5]" :
            "bg-[#FFF9E5] hover:bg-[#FFF9E5]"
            }`}
        >
          1
        </Button>

        {data.totalPage > 1 && (
          <>
            {page > 3 && <span className="px-1 sm:px-2">...</span>}

            {/* Middle pages */}
            {Array.from({ length: data.totalPage }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - page) <= 1 && p !== 1 && p !== data.totalPage)
              .map((p) => (
                <Button
                  key={p}
                  onClick={() => setSortParams({ page: p, sort })}
                  className={`text-black text-xs rounded-md ${page === p ? "bg-[#FBEBB5] hover:bg-[#FBEBB5]" : "bg-[#FFF9E5] hover:bg-[#FFF9E5]"
                    }`}
                >
                  {p}
                </Button>
              ))
            }

            {page < data.totalPage - 2 && <span className="px-1 sm:px-2">...</span>}

            {/* Only show last page if it’s not page 1 */}
            <Button
              onClick={() => setSortParams({ page: data.totalPage, sort })}
              className={`text-black text-xs rounded-md ${page === data.totalPage ? "bg-[#FBEBB5] hover:bg-[#FBEBB5]" : "bg-[#FFF9E5] hover:bg-[#FFF9E5]"
                }`}
            >
              {data.totalPage}
            </Button>

            <Button
              onClick={() => setSortParams({ page: Number(page) + 1, sort })}
              disabled={page === data.totalPage}
              className="btn text-black  bg-[#FFF9E5] hover:bg-[#FFF9E5] text-[10px] rounded-md"
            >
              Next
            </Button>

          </>
        )}

      </div>
    </div>
  )
}
