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

      return object;
    }
  }
);

export const resultSlice = createSlice({
  name: "result",
  initialState: [],
  reducers: {},
  extraReducers: {
    [searchResultRequest.fulfilled]: (state, { payload }) => payload,
  },
});

// export const resultSlice = createSlice({
//   name: "result",
//   initialState: { value: [] },
//   reducers: {
//     complete: (state, action) => {
//       state.value = action.payload;
//     },
//   },
//   extraReducers: {
//     [searchResultRequest.fulfilled]: (state, { payload }) => [...payload],
//   },
// });

// export const { complete } = resultSlice.actions;
export default resultSlice.reducer;
