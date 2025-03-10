import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMeal = () => {
    const [newMeal, setNewMeal] = useState({ title: '', description: '', price: '', category: '' });
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMeal({ ...newMeal, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddMeal = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newMeal.title);
        formData.append('description', newMeal.description);
        formData.append('price', newMeal.price);
        formData.append('category', newMeal.category);
        if (file) {
            formData.append('images', file);
        }

        try {
            await axios.post('http://localhost:8000/createMeals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/admin/MealsList")
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Add New Meal</h1>
                <form onSubmit={handleAddMeal}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="title">Meal Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newMeal.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meal title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="description">Meal Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newMeal.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meal description"
                            required
                            rows="3"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newMeal.price}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter meal price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={newMeal.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full px-2 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            accept="image/*"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Meal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;
