import React from "react";

const DeleteConfirmation = ({ itemName, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete {itemName}?
        </h2>
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
