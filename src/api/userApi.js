import axios from 'axios'; // Import axios for making HTTP requests

const BASE_URL = 'https://dummyjson.com/users'; // Base URL for the API endpoints

//Fetches all users from the API.
export const fetchUsers = async () => {
    // Make a GET request to fetch all users
    const response = await axios.get(BASE_URL);
    // Return the list of users from the response data
    return response.data.users;
};

// Fetches a single user by ID from the API.

export const fetchUserById = async (id) => {
    // Make a GET request to fetch a user by their ID
    const response = await axios.get(`${BASE_URL}/${id}`);
    // Return the user data from the response
    return response.data;
};

// Adds a new user to the API.
export const addUser = async (user) => {
    // Make a POST request to add a new user
    const response = await axios.post(`${BASE_URL}/add`, user);
    // Return the added user data from the response
    return response.data;
};

//Updates an existing user by ID in the API.
export const updateUser = async (id, user) => {
    // Make a PUT request to update the user information
    const response = await axios.put(`${BASE_URL}/${id}`, user);
    // Return the updated user data from the response
    return response.data;
};

//Deletes a user by ID from the API.
export const deleteUser = async (id) => {
    // Make a DELETE request to remove the user
    const response = await axios.delete(`${BASE_URL}/${id}`);
    // Return the response data confirming the deletion
    return response.data;
};
