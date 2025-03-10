import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminAllOrder: [],
  message: "",
  loading: false,
  error: null,
};

export const getAllOrderAdmin = createAsyncThunk("orders/getAllOrderAdmin", async () => {
  try {
    const response = await axios.get("http://localhost:8000/getAllOrders");
    console.log("response.data.orders",response.data.orders)

    return response.data.orders;
  } catch (error) {
    throw Error(error.message);
  }
});

const getAllorderAdmin_slice = createSlice({
  name: "getAllOrderAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrderAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminAllOrder = action.payload;
        state.message = "success";
      })
      .addCase(getAllOrderAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllorderAdmin_slice.reducer;
