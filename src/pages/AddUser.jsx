import React from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/api/userApi";
import UserForm from "@/components/UserForm";
import { toast } from "sonner";

const AddUser = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  // Handles the submission of the user form
  const handleAddUser = async (data) => {
    try {
      await addUser(data); // Call the API function to add the user
      toast.success("User added successfully! Redirecting to User Table...");
      navigate("/"); // Navigate to the Home page after adding the user
    } catch (error) {
      toast.error("Failed to add user.");
      console.error("Failed to add user", error);
    }
  };

  return (
    <div className='container mx-auto p-4 mt-10'>
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default AddUser;
