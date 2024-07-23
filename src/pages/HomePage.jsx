import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@/api/userApi";
import UserTable from "@/components/UserTable";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/UserForm";
import { useNavigate, useLocation } from "react-router-dom";
import MyChart from "@/components/MyChart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const HomePage = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to delete
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State to control Add User form visibility
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get current location

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    getUsers();
  }, []);

  // Manage visibility of Add User form based on URL
  useEffect(() => {
    if (location.pathname === "/add-user") {
      setShowAddUserForm(true);
    } else {
      setShowAddUserForm(false);
    }
  }, [location.pathname]);

  // Open the dialog by navigating to "/add-user"
  const openDialog = () => {
    navigate("/add-user");
  };

  // Close the dialog and navigate to home
  const closeDialog = () => {
    setShowAddUserForm(false);
    navigate("/");
  };

  // Handle delete user action
  const handleDelete = async (id) => {
    if (users.length === 1) {
      setUserToDelete(id); // Set the user to delete
      setIsDialogOpen(true); // Open the confirmation dialog
    } else {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  // Confirm deletion of the last user
  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        setUsers(users.filter((user) => user.id !== userToDelete));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user", error);
        toast.error("Failed to delete user.");
      }
      setUserToDelete(null);
      setIsDialogOpen(false);
    }
  };

  // Prepare data for the chart
  const chartData = [
    {
      name: "Total Users",
      value: users.length,
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <div className='text-center mb-5'>
        <h1 className='text-2xl md:text-3xl font-bold mb-6'>
          User Management Application
        </h1>
        <Button
          onClick={openDialog}
          className='py-2 px-4 bg-black hover:bg-black'
        >
          Add User
        </Button>
        {showAddUserForm && (
          <div>
            <div className='text-lg font-semibold text-white'>Add New User</div>
            <div className='text-sm text-gray-400'>
              Fill out the form below to add a new user.
            </div>

            <UserForm
              onSubmit={() => {
                closeDialog();
              }}
            />
            <div className='mt-4 flex justify-end'>
              <Button
                className='bg-blue-500 text-white rounded-md hover:bg-blue-600'
                onClick={closeDialog}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className='mb-6'>
        <UserTable users={users} onDelete={handleDelete} />
      </div>
      <MyChart data={chartData} />
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className='bg-black rounded-lg shadow-lg max-w-md mx-auto p-6'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl font-semibold text-white mb-2'>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-gray-300 mb-4'>
              This action will permanently delete the last user. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-end'>
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className='px-4 py-2 border border-gray-300 rounded-lg text-white bg-black hover:bg-black hover:text-white transition-colors duration-300'
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomePage;
