import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrderAdmin } from "./redux/GetOrderSlice";
import { fetchAllMeals } from "./redux/getallAdminmeals_Slice";
import { readallpizzas } from "./redux/getAllAdminPizza_Slice";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.getAllOrder.adminAllOrder);

  const vegPizzaCount = useSelector(
    (state) =>
      state.getAdminPizzas.readAllpizza.filter(
        (pizza) => pizza.category === "veg"
      ).length
  );
  const nonVegPizzaCount = useSelector(
    (state) =>
      state.getAdminPizzas.readAllpizza.filter(
        (pizza) => pizza.category === "nonveg"
      ).length
  );
  const beveragesCount = useSelector(
    (state) =>
      state.getAllMeals.readAllmeals.filter(
        (meal) => meal.category === "Beverages"
      ).length
  );
  const dessertsCount = useSelector(
    (state) =>
      state.getAllMeals.readAllmeals.filter(
        (meal) => meal.category === "Desserts"
      ).length
  );

  useEffect(() => {
    dispatch(getAllOrderAdmin());
    dispatch(fetchAllMeals());
    dispatch(readallpizzas());
  }, [dispatch]);

  useEffect(() => {
    const pending = orderData.filter(
      (order) =>
        order.orderStatus === "Pending" ||
        order.orderStatus === "Confirmed" ||
        order.orderStatus === "Out for Delivery"
    );

    const delivered = orderData.filter(
      (order) => order.orderStatus === "Delivered"
    );

    const revenue = delivered.reduce((acc, order) => {
      const orderTotal = order.cartDetails.reduce(
        (sum, item) => sum + (parseFloat(item.total) || 0),
        0
      );
      return acc + orderTotal;
    }, 0);

    setPendingOrder(pending);
    setCompletedOrder(delivered);
    setTotalRevenue(revenue);
  }, [orderData]);

  const chartData = [
    { name: "Veg Pizza", count: vegPizzaCount },
    { name: "Non-Veg Pizza", count: nonVegPizzaCount },
    { name: "Beverages", count: beveragesCount },
    { name: "Desserts", count: dessertsCount },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Total Orders</h3>
          <p className="text-4xl mt-4">{orderData.length}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Pending Orders</h3>
          <p className="text-4xl mt-4">{pendingOrder.length}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Completed Orders</h3>
          <p className="text-4xl mt-4">{completedOrder.length}</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Total Revenue</h3>
          <p className="text-4xl mt-4">₹{totalRevenue}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Pizzas and Meals Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/addpizza"
            className="block bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 text-center"
          >
            Add New Pizza
          </Link>
          <Link
            to="/admin/OrdersPage"
            className="block bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 text-center"
          >
            View Orders
          </Link>
          <Link
            to="/admin/ViewAllCustomers"
            className="block bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300 text-center"
          >
            View Customers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
