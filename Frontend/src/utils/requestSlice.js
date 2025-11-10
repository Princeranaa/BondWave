import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requeste",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
