import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";

const ONE_MINUTE = 1000 * 90;

export const searchResultRequest = createAsyncThunk(
  "request",
  async (searchInput) => {
    const checkCache = localStorage.getItem(searchInput);

    if (checkCache) {
      return checkCache;
    } else {
      const response = await api.get(searchInput);
      const object = {
        data: response.data,
        expireTime: new Date().getTime() + ONE_MINUTE,
      };
      localStorage.setItem(searchInput, JSON.stringify(object));

      return JSON.stringify(object);
    }
  }
);

export const resultSlice = createSlice({
  name: "result",
  initialState: { data: [] },
  reducers: {},
  extraReducers: {
    [searchResultRequest.fulfilled]: (state, { payload }) => {
      state.data = JSON.parse(payload).data;
    },
  },
});

export default resultSlice.reducer;
