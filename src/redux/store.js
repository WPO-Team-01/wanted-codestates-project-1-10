import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { resultSlice } from "./resultSlice";

const reducer = combineReducers({ resultSlice: resultSlice.reducer});

export default configureStore({
  reducer,
});
