import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getAllExpenses} from "./redux/adminExpenses_slice"
import { useDispatch } from 'react-redux';

const AddExpense = ({ onCloseAddExpenses }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    paymentMode: '',
    vendor: '',
    billImage: null
  });

  const dispetch = useDispatch()

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('https://pizzabackend-0x3r.onrender.com/addExpense', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(res.data);
      dispetch(getAllExpenses())
      onCloseAddExpenses()
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      {/* Backdrop for blurring background */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10"></div>

      {/* Modal for Add Expense */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="max-w-md mx-auto p-4 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="title" className="text-sm font-medium text-gray-800">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="amount" className="text-sm font-medium text-gray-800">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  required
                  className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="category" className="text-sm font-medium text-gray-800">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="paymentMode" className="text-sm font-medium text-gray-800">Payment Mode:</label>
                <input
                  type="text"
                  id="paymentMode"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  placeholder="Payment Mode"
                  required
                  className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="vendor" className="text-sm font-medium text-gray-800">Vendor:</label>
                <input
                  type="text"
                  id="vendor"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  placeholder="Vendor"
                  className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="billImage" className="text-sm font-medium text-gray-800">Bill Image:</label>
                <input
                  type="file"
                  id="billImage"
                  name="billImage"
                  onChange={handleChange}
                  className="block w-full text-xs text-gray-500 border border-gray-300 rounded-md file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Full Width Inputs */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="description" className="text-sm font-medium text-gray-800">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="2"
              />
            </div>

         
            <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            Add Expenses
                        </button>
                        <button
                            type="button"
                            onClick={onCloseAddExpenses}
                            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        >
                            Close
                        </button>
                    </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
