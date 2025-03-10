import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaExpand } from 'react-icons/fa';
import UpdateExpensePopup from './EditExpense';
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';
import AddExpense from './AddExpense';
import moment from 'moment';
import { getAllExpenses } from "./redux/adminExpenses_slice";
import { useDispatch, useSelector } from 'react-redux';
import AdminExpenseImageModels from './PopupImage/AdminExpenseImageModels';



const ManageExpenses = () => {
  const [popupExpenseId, setPopupExpenseId] = useState(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState(null);
  const [addExpensesPopup, setAddExpensesPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Image ke liye state
  const dispatch = useDispatch();

  // Fetch all expenses from the redux store
  const allAdminExpenses = useSelector((state) => state.getAllExpenses.getAllExpenses);
  console.log("allAdminExpenses", allAdminExpenses);

  useEffect(() => {
    dispatch(getAllExpenses()); // Fetch all expenses when the component is mounted
  }, [dispatch]);

  // Delete expense function
  const handleDelete = async () => {
    if (deleteExpenseId) {
      try {
        await axios.delete(`http://localhost:8000/delete/${deleteExpenseId}`);
        dispatch(getAllExpenses()); // Refresh expenses after deletion
        setDeleteExpenseId(null); // Clear the delete ID after deletion
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  // Open and close update popup functions
  const openUpdatePopup = (id) => {
    setPopupExpenseId(id);
  };
  const closeUpdatePopup = () => {
    setPopupExpenseId(null);
  };

  // Toggle the add expenses popup
  const handleAddExpensesPopup = () => {
    setAddExpensesPopup(!addExpensesPopup);
  };

  // Handle cancel delete operation
  const handleCancelDelete = () => {
    setDeleteExpenseId(null); // Reset the deleteExpenseId to cancel the delete operation
  };

  // Format date using moment.js
  const formatDate = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY'); // Adjust format as needed
  };

  // Image modal open/close functions
  const openImageModal = (imagePath) => {
    setSelectedImage(imagePath); // Image select karne ke liye
  };
  const closeImageModal = () => {
    setSelectedImage(null); // Modal close karne ke liye
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Manage Expenses</h1>
        <button
          onClick={handleAddExpensesPopup}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4 sm:mt-0"
        >
          Add Expenses
        </button>
      </div>

      {/* Total Expense Display */}
      <div className="mb-4 text-lg sm:text-xl font-semibold">
        Total Expense: ₹{/* Add logic to calculate total expense here */}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="p-2 sm:p-3 text-left">Title</th>
              <th className="p-2 sm:p-3 text-left">Amount</th>
              <th className="p-2 sm:p-3 text-left">Date</th>
              <th className="p-2 sm:p-3 text-left">Category</th>
              <th className="p-2 sm:p-3 text-left">Description</th>
              <th className="p-2 sm:p-3 text-left">Payment Mode</th>
              <th className="p-2 sm:p-3 text-left">Vendor</th>
              <th className="p-2 sm:p-3 text-left">Image</th>
              <th className="p-2 sm:p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAdminExpenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50 text-sm sm:text-base">
                <td className="p-2 sm:p-3">{expense.title}</td>
                <td className="p-2 sm:p-3">₹{expense.amount}</td>
                <td className="p-2 sm:p-3">{formatDate(expense.createdAt)}</td>
                <td className="p-2 sm:p-3">{expense.category}</td>
                <td className="p-2 sm:p-3">{expense.description}</td>
                <td className="p-2 sm:p-3">{expense.paymentMode}</td>
                <td className="p-2 sm:p-3">{expense.vendor}</td>
                <td className="p-2 sm:p-3 relative">
                  {expense.billImage && (
                    <>
                      <img
                        src={`http://localhost:8000/${expense.billImage}`}
                        alt={expense.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                      />
                      <button
                        onClick={() => openImageModal(expense)}
                        className="absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white rounded-full"
                      >
                        <FaExpand />
                      </button>
                    </>
                  )}
                </td>
                <td className="p-2 sm:p-3 flex space-x-2">
                  <button onClick={() => openUpdatePopup(expense._id)} className="text-yellow-500 hover:text-yellow-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => setDeleteExpenseId(expense._id)} className="text-red-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      

      {/* Popups */}
      {popupExpenseId && (
        <UpdateExpensePopup expenseId={popupExpenseId} onClose={closeUpdatePopup} />
      )}
      {addExpensesPopup && (
        <AddExpense onCloseAddExpenses={handleAddExpensesPopup} />
      )}
      {deleteExpenseId && (
        <DeleteConfirmation
          itemName={allAdminExpenses.find(exp => exp._id === deleteExpenseId)?.title}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
     {selectedImage && <AdminExpenseImageModels selectedImage={selectedImage}  closeImageModal={closeImageModal}/>}
    </div>
  );
};

export default ManageExpenses;
