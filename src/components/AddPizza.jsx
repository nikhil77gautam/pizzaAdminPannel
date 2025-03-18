import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPizza = () => {
    const [newPizza, setNewPizza] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewPizza((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setNewPizza((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in newPizza) {
            formData.append(key, newPizza[key]);
        }

        try {
            await axios.post('https://pizzabackend-0x3r.onrender.com/createpizza', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/home');
        } catch (err) {
            console.error('Error adding pizza:', err);
            toast.error('Error adding pizza!', {
                duration: 2000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Toaster position="top-right" />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Add New Pizza</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="title">Pizza Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newPizza.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="description">Pizza Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newPizza.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newPizza.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={newPizza.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option value="veg">Veg</option>
                            <option value="nonveg">NonVeg</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            accept="image/*"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add Pizza
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPizza;