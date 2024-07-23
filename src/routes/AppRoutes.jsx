import AddUser from "@/pages/AddUser";
import EditUser from "@/pages/EditUser";
import HomePage from "@/pages/HomePage";
import UserPage from "@/pages/UserPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* BrowserRouter provides routing context for the app */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/:userId' element={<UserPage />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/edit-user/:userId' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
