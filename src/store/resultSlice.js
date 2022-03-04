import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "result",
  initialState: { value: [] },
  reducers: {
    complete: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { complete } = resultSlice.actions;
export default resultSlice.reducer;
