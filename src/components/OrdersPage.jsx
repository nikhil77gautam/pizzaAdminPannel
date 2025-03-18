import React, { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getAllOrderAdmin } from "./redux/GetOrderSlice.js";
import { useDispatch, useSelector } from "react-redux";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const adminAllOrder = useSelector((state) => state.getAllOrder.adminAllOrder);

  useEffect(() => {
    dispatch(getAllOrderAdmin());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://pizzabackend-0x3r.onrender.com/updateOrderStatus/${orderId}`,
        { orderStatus: newStatus }
      );
      dispatch(getAllOrderAdmin());
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status");
    }
  };

  const statusRenderer = (params) => {
    return (
      <select
        value={params.value}
        onChange={(e) => handleStatusChange(params.data._id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    );
  };

  const columns = [
    { headerName: "Order ID", field: "_id", editable: false },
    { headerName: "Customer Name", field: "customer.name", editable: false },
    {
      headerName: "Phone Number",
      field: "customer.phoneNumber",
      editable: false,
    },
    {
      headerName: "Order Status",
      field: "orderStatus",
      cellRenderer: statusRenderer,
    },
    {
      headerName: "Shipping Address",
      field: "shippingAddress",
      valueGetter: (params) =>
        `${params.data.shippingAddress.city}, ${params.data.shippingAddress.state}, ${params.data.shippingAddress.country}, ${params.data.shippingAddress.postalCode}`,
      editable: false,
    },
    {
      headerName: "Order Date",
      field: "createdAt",
      valueGetter: (params) =>
        new Date(params.data.createdAt).toLocaleDateString(),
      editable: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin - All Orders
      </h2>

      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={adminAllOrder}
          columnDefs={columns}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default OrdersPage;
