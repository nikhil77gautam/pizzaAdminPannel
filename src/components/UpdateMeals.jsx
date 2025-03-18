import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchAllMeals } from "./redux/getallAdminmeals_Slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const UpdateMeals = (props) => {
  // Initialize meals state
  const [meals, setMeals] = useState({
    title: "",
    description: "",
    price: "",
    category: "", // Changed from size to category
    image: null,
  });

  const dispatch = useDispatch();

  // Update meals state when props.data changes
  useEffect(() => {
    if (props.data) {
      setMeals({
        title: props.data.title || "",
        description: props.data.description || "",
        price: props.data.price || "",
        category: props.data.category || "", // Changed to category
        image: props.data.image || null,
      });
    }
  }, [props.data]);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMeals({ ...meals, [id]: value });
  };

  // Handle file changes for image upload
  const handleFileChange = (e) => {
    setMeals({ ...meals, image: e.target.files[0] });
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", meals.title);
    formData.append("description", meals.description);
    formData.append("price", meals.price);
    formData.append("category", meals.category); // Changed to category
    if (meals.image) {
      formData.append("image", meals.image);
    }

    try {
      const response = await axios.put(
        `https://pizzabackend-0x3r.onrender.com/updateMeals/${props.data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Meal updated successfully!");
      }
      props.closeUpdateModelOpenMeals();
      dispatch(fetchAllMeals());
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Meal Name
            </label>
            <input
              type="text"
              id="title"
              value={meals.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={meals.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={meals.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={meals.category}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              UPDATE MEAL
            </button>
            <button
              type="button"
              onClick={props.closeUpdateModelOpenMeals}
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

export default UpdateMeals;
