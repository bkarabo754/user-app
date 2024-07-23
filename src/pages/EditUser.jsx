import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "@/api/userApi";
import UserForm from "@/components/UserForm";

const EditUser = () => {
  const { userId } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null); // State to hold user details
  const navigate = useNavigate();

  // Fetch user details when the component mounts or userId changes
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUserById(userId);
      setUser(user);
    };

    getUser();
  }, [userId]);

  // Handle user update
  const handleUpdate = async (data) => {
    await updateUser(userId, data); // Update user with new data
    navigate(`/user/${userId}`); // Redirect to the user details page after update
  };

  if (!user) return <div>Loading...</div>; // Show loading message while user data is being fetched

  return (
    <div className='container mx-auto p-4 mt-10'>
      <UserForm
        onSubmit={handleUpdate}
        defaultValues={user} // Pre-fill the form with existing user data
      />
    </div>
  );
};

export default EditUser;
