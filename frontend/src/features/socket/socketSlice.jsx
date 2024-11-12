import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketdata: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketdata: (state, action) => {
      state.socketdata = action.payload;
    },
  },
});

export const { setSocketdata } = socketSlice.actions;

export default socketSlice.reducer;
