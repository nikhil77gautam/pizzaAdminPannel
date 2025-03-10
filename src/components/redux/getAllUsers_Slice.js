import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  message: "",
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:8000/getAllUsers");
       console.log("response",response)

    return response.data.message;
  } catch (error) {
    throw Error(error.message);
  }
});

const getAllUsers_Slice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.message = "success";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getAllUsers_Slice.reducer;
