import React, { useState } from 'react'
import { useDeleteContactMutation, useGetAllContactQuery } from '../contact/contactApi.js';
import Loader from '../../components/website/Loader.jsx';
import ErrorMessage from '../../components/website/ErrorMessage.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog.jsx';
import { AiFillDelete } from 'react-icons/ai'
import toast from 'react-hot-toast';

export default function ShowContact() {
  const { isLoading, error, data: contacts } = useGetAllContactQuery();
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [removeItem, { isLoading: isDeleting }] = useDeleteContactMutation();

  const handleOpen = (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleRemove = async (id) => {
    const confirmRemove = window.confirm("Are you sure you want to delete?");
    if (!confirmRemove) return;
    try {
      await removeItem(id).unwrap();
      toast.success("Delete Successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete data");
    }
  }
  if (isLoading) return <Loader text="Please Wait..." />;
  if (error) return (
    <ErrorMessage message={error.data?.message} />
  );
  return (
    <>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-center'>Contact Info</h3>
        <div className="max-h-[90vh] overflow-y-auto rounded-md border relative max-w-sm mx-auto">
          {contacts && contacts.length > 0 ? (contacts.map((contact) => (
            <div
              key={contact._id}
              className=" flex flex-col hover:bg-gray-50 bg-white cursor-pointer border-b p-2 gap-1">
              <div className='flex items-center justify-between'>
                <div>
                  <h6 className="font-medium text-sm">
                    {contact.email}
                  </h6>
                  <h6 className='text-gray-500 font-medium text-xs'>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </h6>
                </div>

                <button className={`cursor-pointer ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleRemove(contact._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="animate-spin h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full inline-block"></span>
                  ) : (
                    <AiFillDelete className="text-red-400 h-6 w-5" />
                  )}
                </button>
              </div>
              <div
                onClick={() => handleOpen(contact)}
                className="text-right">
                <p className='text-gray text-sm line-clamp-1'>
                  {contact.message}
                </p>
              </div>
            </div>
          ))
          ) : (
            <h6 className="text-center text-gray py-6">
              No Contact Found
            </h6>
          )}

        </div>
      </div >

      {selectedContact && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>
                {selectedContact.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className='text-sm text-gray'>
                  {selectedContact.name}
                </p>
                <p className='text-xs text-gray'>
                  {new Date(selectedContact.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-gray'>
                  Subject: {selectedContact?.subject}
                </p>
                <p className='text-sm text-gray'>
                  {selectedContact?.message}
                </p>

              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
