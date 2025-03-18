import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchAllMeals } from "./redux/getallAdminmeals_Slice";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import UpdateMeals from "./UpdateMeals";

const MealsList = () => {
  const [mealsId, setMealsId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for delete
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal for deletion
  const [updateModalOpen, setUpdateModalOpen] = useState(null); // Modal state for update

  const dispatch = useDispatch();
  const allMealsFetch = useSelector((state) => state.getAllMeals.readAllmeals);

  useEffect(() => {
    dispatch(fetchAllMeals());
  }, [dispatch]);

  const handleDeleteMeal = async () => {
    if (mealsId) {
      try {
        await axios.post(
          "https://pizzabackend-0x3r.onrender.com/deleteOneMeals",
          {
            itemsId: mealsId,
          }
        );
        setMealsId(null);
        setIsModalOpen(false); // Close modal after deletion
        dispatch(fetchAllMeals()); // Refetch meals after delete
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    }
  };

  const openDeleteModal = (meal) => {
    setSelectedMeal(meal); // Store meal details
    setMealsId(meal._id); // Set the meal ID for deletion
    setIsModalOpen(true); // Open modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const openUpdateModal = (meal) => {
    setUpdateModalOpen(meal); // Open update modal with selected meal
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(null); // Close update modal
  };

  // Column definitions for the ag-grid
  const columnDefs = [
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={`https://pizzabackend-0x3r.onrender.com/${params.value}`}
          alt={params.data.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    {
      headerName: "Title",
      field: "title",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Description",
      field: "description",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Price",
      field: "price",
      filter: "agNumberColumnFilter",
      cellRenderer: (params) => `₹${params.value}`,
    },
    {
      headerName: "Category",
      field: "category",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex space-x-4">
          <button
            onClick={() => openUpdateModal(params.data)}
            className="bg-blue-500 text-white px-4 py-0 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
            onClick={() => openDeleteModal(params.data)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Meal List</h1>
      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={allMealsFetch}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowHeight={80}
        />
      </div>

      {/* Render DeleteConfirmation Modal */}
      {isModalOpen && selectedMeal && (
        <DeleteConfirmation
          itemName={selectedMeal.title}
          onDelete={handleDeleteMeal}
          onCancel={closeDeleteModal}
        />
      )}

      {/* Render UpdateMeals Modal */}
      {updateModalOpen && (
        <UpdateMeals
          data={updateModalOpen}
          closeUpdateModelOpenMeals={closeUpdateModal}
        />
      )}
    </div>
  );
};

export default MealsList;
