import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';
import Updatepizza from './Updatepizza';
import {readallpizzas} from "./redux/getAllAdminPizza_Slice";
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const [updatePizzaPopupId, setUpdatePizzaPopupId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(null);
    
    const dispatch = useDispatch();
    const allAdminPizza = useSelector((state) => state.getAdminPizzas.readAllpizza);
    console.log("allAdminPizza", allAdminPizza);

    useEffect(() => {
        dispatch(readallpizzas());
    }, []);

    const handleDeletePizza = async () => {
        if (selectedPizza) {
            try {
                await axios.post(`http://localhost:8000/deletepizzas/${selectedPizza._id}`);
                setIsDeleteModalOpen(false);
                dispatch(readallpizzas());
            } catch (error) {
                console.error('Error deleting pizza:', error);
            }
        }
    };

    const updatePizzaPopupOpen = (id) => {
        setUpdatePizzaPopupId(id);
    };

    const updatePizzaPopupClose = () => {
        setUpdatePizzaPopupId(null);
    };

    const openDeleteModal = (pizza) => {
        setSelectedPizza(pizza);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedPizza(null);
    };

    const columns = [
        {
            headerName: "Image",
            field: "image",
            filter: false,
            cellRenderer: (params) => (
                <img
                    src={`http://localhost:8000/${params.value}`}
                    alt={params.data.title}
                    className="w-20 h-10 object-cover rounded-lg"
                />
            )
        },
        {
            headerName: "Title",
            field: "title",
            filter: 'agTextColumnFilter'
        },
        {
            headerName: "Description",
            field: "description",
            filter: 'agTextColumnFilter'
        },
        {
            headerName: "Price",
            field: "price",
            filter: 'agNumberColumnFilter',
            cellRenderer: (params) => `₹${params.value}`
        },
        {
            headerName: "Category",
            field: "category",
            filter: 'agTextColumnFilter'
        },
        {
            headerName: "Actions",
            field: "actions",
            cellRenderer: (params) => (
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-0 rounded-lg hover:bg-blue-600"
                        onClick={() => updatePizzaPopupOpen(params.data._id)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-0 rounded-lg hover:bg-red-600"
                        onClick={() => openDeleteModal(params.data)}
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Available Pizzas</h2>
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        rowData={allAdminPizza}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        domLayout='autoHeight'
                        rowHeight={60}
                      
                    />
                </div>
                {updatePizzaPopupId && <Updatepizza pizzaId={updatePizzaPopupId} updatePizzaPopupClose={updatePizzaPopupClose} />}
                {isDeleteModalOpen && selectedPizza && (
                    <DeleteConfirmation
                        itemName={selectedPizza.title}
                        onDelete={handleDeletePizza}
                        onCancel={closeDeleteModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
