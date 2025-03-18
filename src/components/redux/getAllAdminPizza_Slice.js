import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  readAllpizza: [],
  message: "",
  loading: false,
  error: null,
};

export const readallpizzas = createAsyncThunk("readallpizzas", async () => {
  try {
    const response = await axios.get(
      "https://pizzabackend-0x3r.onrender.com/readallpizzas"
    );
    console.log("response", response);

    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

const getAllAdminPizza_Slice = createSlice({
  name: "readallpizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readallpizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(readallpizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.readAllpizza = action.payload;
        state.message = "success";
      })
      .addCase(readallpizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllAdminPizza_Slice.reducer;
