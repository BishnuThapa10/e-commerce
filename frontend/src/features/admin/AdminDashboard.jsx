import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table.jsx'
import { useGetAllProductQuery } from '../product/productApi.js'
import { IoAddCircleSharp } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from 'react-router';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import DeleteItem from './DeleteItem.jsx';

export default function AdminDashboard() {
  const { isLoading, error, data } = useGetAllProductQuery();
  if (isLoading) return <Loader text="Please Wait..." />;
  if (error) return (
    <ErrorMessage message={error.data?.message} />
  );
  return (
    <div>
      <Table className="text-sm [&_tr:hover]:bg-transparent">
        <TableHeader className="bg-indigo-100">
          <TableRow>
            <TableHead className="font-semibold text-center">Product</TableHead>
            <TableHead className="font-semibold text-center">Price</TableHead>
            <TableHead className="font-semibold text-center">Quantity</TableHead>
            <TableHead className="font-semibold text-center">Category</TableHead>
            <TableHead className="font-semibold text-center">Colors</TableHead>
            <TableHead className="font-semibold text-center">Size</TableHead>
            <TableHead className="font-semibold text-center">Featured</TableHead>
            <TableHead className="font-semibold text-center">
              <Link to="/admin/addItems">
                <IoAddCircleSharp className='text-green-400 h-6 w-5' />
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.furniture.map((furniture) => (
            <TableRow key={furniture._id}>
              <TableCell className='flex gap-4 items-center'>
                {furniture.images && furniture.images.length > 0 ? (
                  <div className='max-w-20 max-h-20 min-w-10 min-h-10 flex items-center justify-center bg-indigo-100'>
                    <img
                      src={furniture.images[0].url}
                      alt={furniture.name}
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
                <span className='text-sm text-[#9F9F9F]'>{furniture.name}</span>
              </TableCell>
              <TableCell className=' text-[#9F9F9F] text-center'>{furniture.price}</TableCell>
              <TableCell className="text-center">{furniture.stock}</TableCell>
              <TableCell className="text-center">{furniture.category}</TableCell>
              <TableCell>
                <div className="flex justify-center items-center gap-3">
                  {furniture.colors.map(color => (
                    <div key={color._id} className="flex gap-2">
                      <div
                        className="w-5 h-5 p-0 rounded-full"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center"><div className="flex justify-center gap-1">
                {furniture.size?.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
                  >
                    {sz}
                  </span>
                ))}
              </div></TableCell>
              <TableCell className="text-center">{furniture.isFeatured ? "Yes" : "No"}</TableCell>
              <TableCell className="text-center">
                <div className='flex gap-2 items-center'>
                  <Link to={`/admin/update-items/${furniture._id}`}>
                    <BiSolidEdit className='text-blue-400 h-6 w-5' />
                  </Link>
                  <DeleteItem id={furniture._id}/>
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div>
  )
}
