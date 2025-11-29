import React from 'react'
import SearchInput from './SearchInput.jsx'
import { useNavigate, useSearchParams } from 'react-router';
import { useGetAllProductQuery } from '../product/productApi.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { Button } from '../../components/ui/button.jsx';
import { formatPrice } from '../../lib/priceFormat.js';

export default function Search() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const relatedTo = searchParams.get("relatedTo") || "";
  const page = Number(searchParams.get("page")) || 1;
  let sort = searchParams.get("sort");
  if (searchParams.has("topPick")) {
    sort = "-ratings.average";
  }

  const { data, isLoading, error } = useGetAllProductQuery({
    search: q,
    relatedTo,
    sort,
    page,
    limit: 8,
  });

  if (isLoading) return <Loader text="Searching products..." />;
  if (error)
    return <ErrorMessage message={error?.data?.message || "Error"} />;

  let heading = "All Products";

  if (q) heading = `Search results for "${q}"`;
  else if (relatedTo) heading = "Related Products";
  else if (sort) heading = "Top Pick";

  return (
    <div className='space-y-1'>
      <SearchInput setSearchParams={setSearchParams} q={q} />

      {/* ✅ Page Title */}
      <h1 className="text-lg md:text-2xl font-semibold text-left px-8">{heading}</h1>

      {data?.furniture?.length === 0 && <h1 className="text-center py-4 text-gray-500">No data</h1>}

      {/* Products Grid */}
      {data?.furniture?.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-8 place-items-center">

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

      </div>}

      {/* Pagination */}
      {data?.furniture?.length > 0 && <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        {/* Always show first page */}
        <Button
          onClick={() => setSearchParams({ relatedTo, sort, q, page: 1 })}
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
                  onClick={() => setSearchParams({ relatedTo, sort, q, page: p })}
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
              onClick={() => setSearchParams({ relatedTo, sort, q, page: data.totalPage })}
              className={`text-black text-xs rounded-md ${page === data.totalPage ? "bg-[#FBEBB5] hover:bg-[#FBEBB5]" : "bg-[#FFF9E5] hover:bg-[#FFF9E5]"
                }`}
            >
              {data.totalPage}
            </Button>

            <Button
              onClick={() => setSearchParams({ relatedTo, sort, q, page: Number(page) + 1, })}
              disabled={page === data.totalPage}
              className="btn text-black  bg-[#FFF9E5] hover:bg-[#FFF9E5] text-[10px] rounded-md"
            >
              Next
            </Button>

          </>
        )}

      </div>}
    </div>
  )
}
