import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AddPizza from "../components/AddPizza";
import Home from "../components/Home";
import Updatepizza from "../components/Updatepizza";
import OrdersPage from "../components/OrdersPage";
import ViewAllCustomers from "../components/ViewAllCustomers";
import AddExpense from "../components/AddExpense";
import ManageExpenses from "../components/ManageExpenses";
import EditExpense from "../components/EditExpense";
import AddMeal from "../components/AddMeal";
import MealsList from "../components/MealsList";
import UpdateMeals from "../components/UpdateMeals";
import ReviewsPage from "../components/reviews/All_Reviews";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-30">
        {" "}
        {/* Navbar upar hona chahiye */}
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 z-20`}
      >
        {/* Sidebar ko top-16 kiya taki navbar ke neeche aaye */}
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Content below navbar */}
        <div className="flex-1 mt-16 p-6 overflow-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/addpizza" element={<AddPizza />} />
            <Route path="/admin/home" element={<Home />} />
            <Route
              path="/admin/Updatepizza/:pizzaId"
              element={<Updatepizza />}
            />
            <Route path="/admin/OrdersPage" element={<OrdersPage />} />
            <Route
              path="/admin/ViewAllCustomers"
              element={<ViewAllCustomers />}
            />
            <Route path="/admin/manageexpenses" element={<ManageExpenses />} />
            <Route path="/admin/AddExpense" element={<AddExpense />} />
            <Route path="/admin/EditExpense/:id" element={<EditExpense />} />
            <Route path="/admin/AddMeal" element={<AddMeal />} />
            <Route path="/admin/MealsList" element={<MealsList />} />
            <Route path="/admin/UpdateMeals/:id" element={<UpdateMeals />} />
            <Route path="/admin/ReviewsPage" element={<ReviewsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
