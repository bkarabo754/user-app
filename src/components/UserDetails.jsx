import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";

const UserDetails = ({ user }) => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle navigation to edit page
  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`); // Navigate to the edit page with user ID
  };

  return (
    // Displaying user details
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-40'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>User Details</h2>
      <div className='space-y-4'>
        <div className='flex justify-between py-2 border-b border-gray-200'>
          <span className='text-gray-600 font-medium'>ID:</span>
          <span className='text-gray-800'>{user.id}</span>
        </div>
        <div className='flex justify-between py-2 border-b border-gray-200'>
          <span className='text-gray-600 font-medium'>First Name:</span>
          <span className='text-gray-800'>{user.firstName}</span>
        </div>
        <div className='flex justify-between py-2 border-b border-gray-200'>
          <span className='text-gray-600 font-medium'>Last Name:</span>
          <span className='text-gray-800'>{user.lastName}</span>
        </div>
        <div className='flex justify-between py-2 border-b border-gray-200'>
          <span className='text-gray-600 font-medium'>Email:</span>
          <span className='text-gray-800'>{user.email}</span>
        </div>
        <div className='flex justify-between py-2'>
          <span className='text-gray-600 font-medium'>Phone:</span>
          <span className='text-gray-800'>{user.phone}</span>
        </div>
      </div>
      <div className='mt-6 flex justify-end'>
        <Button
          onClick={handleEdit}
          className='bg-black text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
