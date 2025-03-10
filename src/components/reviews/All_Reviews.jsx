import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../redux/getUserReview_slice';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ReviewsPage = () => {
    const reviewData = useSelector((state) => state.getUserReview.reviewData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchReviews());
            } catch (error) {
                setError('Failed to fetch reviews.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    // Delete review function
    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`/api/reviews/delete/${reviewId}`);
            dispatch(fetchReviews());
        } catch (error) {
            console.error('Failed to delete review', error);
            setError('Failed to delete review.');
        }
    };

    // Placeholder for handleApproval function
    const handleApproval = async (reviewId, status) => {
        // Implement approval logic here
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    // Column definitions for AG Grid
    const columnDefs = [
        { headerName: 'Customer Name', field: 'customerId.name', sortable: true, filter: true },
        { headerName: 'Customer Email', field: 'customerId.email', sortable: true, filter: true },
        { headerName: 'Order ID', field: 'orderId._id', sortable: true, filter: true },
        {
            headerName: 'Rating',
            field: 'rating',
            cellRenderer: (params) => renderStars(params.value),
            sortable: true,
            filter: true
        },
        { headerName: 'Comment', field: 'comment', sortable: true, filter: true },
        {
            headerName: 'Date',
            field: 'createdAt',
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortable: true,
            filter: true
        },
        // {
        //     headerName: 'Actions',
        //     cellRenderer: (params) => (
        //         <div className="flex gap-2">
        //             <button
        //                 onClick={() => handleApproval(params.data._id, 'approved')}
        //                 className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
        //             >
        //                 Approve
        //             </button>
        //             <button
        //                 onClick={() => handleApproval(params.data._id, 'disapproved')}
        //                 className="bg-yellow-500 text-white px-1 py-1 rounded hover:bg-yellow-600"
        //             >
        //                 Disapprove
        //             </button>
        //             <button
        //                 onClick={() => handleDelete(params.data._id)}
        //                 className="bg-red-600 text-white px-1 py-1 rounded hover:bg-red-700"
        //             >
        //                 Delete
        //             </button>
        //         </div>
        //     )
        // }
    ];

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = Array(5).fill(0);
        return (
            <div className="flex space-x-1">
                {stars.map((_, index) => {
                    const starRating = index + 1;
                    return (
                        <span
                            key={index}
                            className={`text-${starRating <= rating ? 'yellow-500' : 'gray-300'} text-xl`}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="ag-theme-alpine max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">All Reviews</h2>
            <AgGridReact
                rowData={reviewData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                domLayout='autoHeight'
                enableCellTextSelection={true}
            />
        </div>
    );
};

export default ReviewsPage;
