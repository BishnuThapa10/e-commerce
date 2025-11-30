import React, { useState } from 'react'
import { useGetAllOrderQuery } from '../product/orderApi.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog.jsx';

export default function OrderUi() {
  const { isLoading, isError, error, data: orders } = useGetAllOrderQuery();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  if (isLoading) return <Loader text="Please Wait..." />;
  if (isError) return (
    <ErrorMessage message={error.data?.message || error?.message || 'Something went wrong'} />
  );
  return (
    <>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-center'>Order History</h3>
        <div className="max-h-[90vh] overflow-y-auto rounded-md border relative max-w-sm mx-auto">
          {orders && orders.length > 0 ? (orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleOpen(order)}
              className="flex items-center justify-between p-3 hover:bg-gray-50 bg-white cursor-pointer border-b">
              <div>
                <h6 className="font-medium text-sm">
                  {order._id}
                </h6>
                <h6 className='text-gray font-medium text-sm'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </h6>
              </div>
              <div className="text-right">
                <h6 className='text-gray text-sm'>
                  Rs.{order.totalAmount}
                </h6>
              </div>
            </div>
          ))
          ) : (
            <h6 className="text-center text-gray py-6">
              No orders found
            </h6>
          )}

        </div>
      </div >

      {selectedOrder && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                {selectedOrder.paymentMethod}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className='text-sm text-gray'>
                  Date:{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
                <p className='text-sm text-gray'>
                  Total: {selectedOrder.totalAmount}
                </p>
              </div>
              <div>
                <h6 className="mb-2">
                  Items
                </h6>
                <ul className="list-none pl-5 space-y-1">
                  {selectedOrder.orderItems.map((item, index) => (
                    <li key={item.furniture} className="flex items-center gap-x-2 text-sm">
                      <div className='w-10 h-10  flex items-center justify-center bg-indigo-100 overflow-hidden'>
                        <img
                          src={item.image.url}
                          alt={item.name}
                          className="max-h-full max-w-full object-cover"
                        />
                      </div>
                      {item.name} — {item.quantity} × {item.price} ({item.color}) ({item.size})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
