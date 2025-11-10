import { createSlice } from "@reduxjs/toolkit";

const conectionSlice = createSlice({
    name: "conection",
    initialState: null,
    reducers: {
        addConection: (state,action) => action.payload,
        removeConection: ()=> null
    }
});

export const {addConection,removeConection} = conectionSlice.actions;

export default conectionSlice.reducer;

