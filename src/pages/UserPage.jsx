import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "@/api/userApi";
import UserDetails from "@/components/UserDetails";
import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const { userId } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null); // State to hold user details
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const navigate = useNavigate(); // Hook for navigation

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
    const updatedUser = await updateUser(userId, data);
    setUser(updatedUser);
    setIsEditing(false); // Exit edit mode after update
    navigate("/"); // Redirect to homepage after submission
  };

  // Show loading message while user data is being fetched
  if (!user) return <div>Loading...</div>;

  return (
    <div className='container mx-auto p-4'>
      {isEditing ? (
        // Show user form in edit mode
        <UserForm
          onSubmit={handleUpdate}
          defaultValues={user}
          onCancel={() => setIsEditing(false)} // Cancel edit mode
        />
      ) : (
        // Show user details in view mode
        <UserDetails user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UserPage;
