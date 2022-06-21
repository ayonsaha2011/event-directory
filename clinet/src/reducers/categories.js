import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryDataService from "../services/CategoryService";

const initialState = [];

export const createCategory = createAsyncThunk(
  "categories/create",
  async ({ name, description}) => {
    const res = await CategoryDataService.create({ name, description });
    return res.data;
  }
);

export const retrieveCategories = createAsyncThunk(
  "categories/retrieve",
  async () => {
    const res = await CategoryDataService.getAll();
    return res.data;
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [createCategory.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveCategories.fulfilled]: (state, action) => {
      return [...action.payload];
    }
  },
});

const { reducer } = categorySlice;
export default reducer;