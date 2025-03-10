import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AdminExpenseImageModels = ({ selectedImage, closeImageModal }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl relative"> {/* Increased padding and max width */}
        <button
          onClick={closeImageModal}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaTimes className="text-2xl" /> 
        </button>
        <img
          src={`http://localhost:8000/${selectedImage.billImage}`}
          alt="Expense Bill"
          className="w-full h-auto rounded"
        />
      </div>
    </div>
  );
}

export default AdminExpenseImageModels;
