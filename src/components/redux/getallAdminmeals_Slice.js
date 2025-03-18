import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  readAllmeals: [],
  message: "",
  loading: false,
  error: null,
};

export const fetchAllMeals = createAsyncThunk("readAllmeals", async () => {
  try {
    const response = await axios.get(
      "https://pizzabackend-0x3r.onrender.com/readAllmeals"
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

const getAllAdminMeals_Slice = createSlice({
  name: "readAllmeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.readAllmeals = action.payload;

        state.message = "success";
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllAdminMeals_Slice.reducer;
