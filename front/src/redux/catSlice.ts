import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCats as fetchCatsAPI } from "../api/cats";
import { CatItem } from "../types/types";

interface CatsState {
  items: CatItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CatsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async (limit: number, thunkAPI) => {
    try {
      const data = await fetchCatsAPI(limit);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch cats");
    }
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default catsSlice.reducer;
