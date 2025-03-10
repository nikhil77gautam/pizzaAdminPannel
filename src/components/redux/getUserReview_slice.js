import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviewData: [],
  message: "",
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk("getAllReviews", async () => {
  try {
    const response = await axios.get("http://localhost:8000/getAllReviews");
    console.log("response",response)

    return response.data.reviews;
  } catch (error) {
    throw Error(error.message);
  }
});

const getUserReview_Slice = createSlice({
  name: "fetchAllReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewData = action.payload;
        state.message = "success";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getUserReview_Slice.reducer;
