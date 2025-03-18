import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getAllExpenses: [],
  message: "",
  loading: false,
  error: null,
};

export const getAllExpenses = createAsyncThunk("getAllExpense", async () => {
  try {
    const response = await axios.get(
      "https://pizzabackend-0x3r.onrender.com/getAllExpense"
    );
    return response.data.expenses;
  } catch (error) {
    throw Error(error.message);
  }
});

const getAllAdminExpenses_Slice = createSlice({
  name: "getAllOrderAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllExpenses = action.payload;
        state.message = "success";
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllAdminExpenses_Slice.reducer;
