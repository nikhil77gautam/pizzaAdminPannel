import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPizzaSlice,
  FaClipboardList,
  FaPlus,
  FaMoneyBill,
  FaListAlt,
  FaStar,
} from "react-icons/fa";

const Sidebar = ({ toggleSidebar }) => {
  const [pizzaOpen, setPizzaOpen] = useState(false);
  const [mealsOpen, setMealsOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false); // For rating management section

  const navigate = useNavigate();

  // Toggle functions for Pizza, Meals, and Rating management sections
  const togglePizzaManagement = () => {
    setPizzaOpen(!pizzaOpen);
  };

  const toggleMealsManagement = () => {
    setMealsOpen(!mealsOpen);
  };

  const toggleRatingManagement = () => {
    setRatingOpen(!ratingOpen);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center font-bold text-lg border-b border-gray-700 hover:text-gray-400">
        Admin Panel
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
              onClick={toggleSidebar}
            >
              <FaTachometerAlt className="hover:text-gray-400" />
              <span className="hover:text-gray-400">Dashboard</span>
            </Link>
          </li>

          {/* Pizza Management Section */}
          <li>
            <div
              className="cursor-pointer flex items-center justify-between p-2 rounded hover:bg-gray-700"
              onClick={togglePizzaManagement}
            >
              <span className="flex items-center space-x-2">
                <FaPizzaSlice className="hover:text-gray-400" />
                <span className="hover:text-gray-400">Pizza Management</span>
              </span>
              <span>{pizzaOpen ? "-" : "+"}</span>
            </div>
            {pizzaOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/addpizza"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                    onClick={toggleSidebar}
                  >
                    <FaPlus className="hover:text-gray-400" />
                    <span className="hover:text-gray-400">Add Pizza</span>
                  </Link>
                </li>
                <li onClick={togglePizzaManagement}>
                  <Link
                    to="/admin/home"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                    onClick={toggleSidebar}
                  >
                    <FaClipboardList className="hover:text-gray-400" />
                    <span className="hover:text-gray-400">Pizza List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Meals Management Section */}
          <li>
            <div
              className="cursor-pointer flex items-center justify-between p-2 rounded hover:bg-gray-700"
              onClick={toggleMealsManagement}
            >
              <span className="flex items-center space-x-2">
                <FaPizzaSlice className="hover:text-gray-400" />
                <span className="hover:text-gray-400">Meals Management</span>
              </span>
              <span>{mealsOpen ? "-" : "+"}</span>
            </div>
            {mealsOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/AddMeal"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                    onClick={toggleSidebar}
                  >
                    <FaPlus className="hover:text-gray-400" />
                    <span className="hover:text-gray-400">Add Meal</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/MealsList"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded "
                    onClick={toggleSidebar}
                  >
                    <FaClipboardList className="hover:text-gray-400" />
                    <span className="hover:text-gray-400">Meals List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Rating Management Section */}
          <li>
            <div
              className="cursor-pointer flex items-center justify-between p-2 rounded hover:bg-gray-700"
              onClick={toggleRatingManagement}
            >
              <span className="flex items-center space-x-2">
                <FaStar className="hover:text-gray-400" />
                <span className="hover:text-gray-400">Rating Management</span>
              </span>
              <span>{ratingOpen ? "-" : "+"}</span>
            </div>
            {ratingOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/ReviewsPage"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                    onClick={toggleSidebar}
                  >
                    <FaClipboardList className="hover:text-gray-400" />
                    <span className="hover:text-gray-400">Review List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other Sections */}
          <li>
            <Link
              to="/admin/OrdersPage"
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
              onClick={toggleSidebar}
            >
              <FaListAlt className="hover:text-gray-400" />
              <span className="hover:text-gray-400">Manage Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manageexpenses"
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
              onClick={toggleSidebar}
            >
              <FaMoneyBill className="hover:text-gray-400" />
              <span className="hover:text-gray-400">Manage Expenses</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
