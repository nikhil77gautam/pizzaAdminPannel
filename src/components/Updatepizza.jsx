import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { readallpizzas } from "./redux/getAllAdminPizza_Slice";
import { useDispatch } from 'react-redux';

const Updatepizza = ({ pizzaId, updatePizzaPopupClose }) => {
    const [pizza, setPizza] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/readOnePizza/${pizzaId}`);
                setPizza({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    category: response.data.category,
                    image: response.data.image
                });
            } catch (error) {
                console.error('Error fetching pizza data:', error);
                toast.error('Failed to fetch pizza data!');
            }
        };

        fetchPizza();
    }, [pizzaId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPizza(prevPizza => ({
            ...prevPizza,
            [id]: value
        }));
    };

    const handleFileChange = (e) => {
        setPizza(prevPizza => ({
            ...prevPizza,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', pizza.title);
        formData.append('description', pizza.description);
        formData.append('price', pizza.price);
        formData.append('category', pizza.category);
        if (pizza.image) {
            formData.append('image', pizza.image);
        }

        try {
            const response = await axios.put(`http://localhost:8000/updatepizzas/${pizzaId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response status:', response.status); // Log the response status for debugging

            if (response.status === 200) {
                toast.success('Pizza updated successfully!', { duration: 4000 });
                dispatch(readallpizzas());
                updatePizzaPopupClose();
            } else {
                toast.error('Failed to update pizza.');
            }
        } catch (error) {
            console.error('Error updating pizza:', error.response?.data || error.message);
            toast.error('Error updating pizza!');
        }
    };

    // Loading state check
    if (!pizza) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Toaster /> {/* Moved Toaster outside the form */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Update Pizza</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={pizza.title}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={pizza.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={pizza.price}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            value={pizza.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option value="veg">Veg</option>
                            <option value="nonveg">NonVeg</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            Update Pizza
                        </button>
                        <button
                            type="button"
                            onClick={updatePizzaPopupClose}
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

export default Updatepizza;
