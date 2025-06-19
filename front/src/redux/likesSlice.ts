import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLikes, likeCat, unlikeCat } from "../api/likes";
import { CatItem } from "../types/types";

import { fetchCatById } from "../api/cats";

interface LikesState {
  likedCats: string[];
  likedCatData: CatItem[];
  status: string;
}

const initialState: LikesState = {
  likedCats: [],
  likedCatData: [],
  status: "idle",
};

export const fetchLikes = createAsyncThunk(
  "likes/fetch",
  async (_arg, thunkAPI) => {
    try {
      const data = await getLikes();
      const catIds = data.map((like: any) => like.cat_id);

      const cats = await Promise.all(
        catIds.map((id: string) => fetchCatById(id))
      );

      return { catIds, cats };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch likes");
    }
  }
);

export const addLike = createAsyncThunk(
  "likes/add",
  async (cat: CatItem, thunkAPI) => {
    try {
      await likeCat(cat.id);
      return cat;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to like the cat"
      );
    }
  }
);

export const removeLike = createAsyncThunk(
  "likes/remove",
  async (cat_id: string, thunkAPI) => {
    try {
      await unlikeCat(cat_id);
      return cat_id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(
        error.message || "Failed to unlike the cat"
      );
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.likedCats = action.payload.catIds;
        state.likedCatData = action.payload.cats;
      })
      .addCase(addLike.pending, (state, action) => {
        const cat = action.meta.arg;
        if (!state.likedCats.includes(cat.id)) {
          state.likedCats.push(cat.id);
          state.likedCatData.push(cat);
        }
      })
      .addCase(addLike.rejected, (state, action) => {
        const cat = action.meta.arg;
        state.likedCats = state.likedCats.filter((id) => id !== cat.id);
        state.likedCatData = state.likedCatData.filter((c) => c.id !== cat.id);
      })
      .addCase(removeLike.pending, (state, action) => {
        const id = action.meta.arg;
        state.likedCats = state.likedCats.filter((catId) => catId !== id);
        state.likedCatData = state.likedCatData.filter((c) => c.id !== id);
      })
      .addCase(removeLike.rejected, (state, action) => {
        const id = action.meta.arg;
        if (!state.likedCats.includes(id)) {
          state.likedCats.push(id);
        }
      });
  },
});

export default likesSlice.reducer;
