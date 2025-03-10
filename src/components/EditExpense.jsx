import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getAllExpenses} from "./redux/adminExpenses_slice"
import { useDispatch } from 'react-redux';

const EditExpense = ({ expenseId, onClose }) => {
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        paymentMode: '',
        vendor: '',
        billImage: null
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getSingleExpense/${expenseId}`);
                setExpense(response.data);
            } catch (err) {
                console.error('Error fetching expense details:', err);
            }
        };
        fetchExpense();
    }, [expenseId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setExpense(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setExpense(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in expense) {
            formData.append(key, expense[key]);
        }

        try {
            await axios.put(`http://localhost:8000/update/${expenseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/admin/manageexpenses');
            dispatch(getAllExpenses())
            onClose();
        } catch (err) {
            console.error('Error updating expense:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Edit Expense</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="title" className="text-sm font-medium text-gray-800">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={expense.title}
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
                                value={expense.amount}
                                onChange={handleChange}
                                placeholder="Amount"
                                required
                                className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="category" className="text-sm font-medium text-gray-800">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={expense.category}
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
                                value={expense.paymentMode}
                                onChange={handleChange}
                                placeholder="Payment Mode"
                                className="block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="vendor" className="text-sm font-medium text-gray-800">Vendor:</label>
                            <input
                                type="text"
                                id="vendor"
                                name="vendor"
                                value={expense.vendor}
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

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="description" className="text-sm font-medium text-gray-800">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={expense.description}
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
                            Update Expense
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExpense;
