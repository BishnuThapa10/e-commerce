import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useRemoveItemMutation } from '../product/productApi.js'
import toast from 'react-hot-toast';
import FullScreenLoader from '../../components/website/FullScreenLoader.jsx';

export default function DeleteItem({ id }) {
  const [removeItem, { isLoading }] = useRemoveItemMutation();

  const handleRemove = async () => {
    const confirmRemove = window.confirm("Are you sure you want to delete?");
    if (!confirmRemove) return;
    try {
      await removeItem(id).unwrap();
      toast.success("Delete Successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete data");
    }
  }
  return (
    <>
      <FullScreenLoader show={isLoading} message="Deleting item..." />
      <button className={`cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleRemove}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full inline-block"></span>
        ) : (
          <AiFillDelete className="text-red-400 h-6 w-5" />
        )}
      </button>
    </>
  )
}
