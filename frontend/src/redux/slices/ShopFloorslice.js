import { createSlice } from "@reduxjs/toolkit";

const shopfloorSlice = createSlice({
  name: "shopfloor",
  initialState: {
    isRunning: false,
    error: null,
  },
  reducers: {
    startShopfloor: (state) => {
      state.isRunning = true;
      state.error = null;
    },
    stopShopfloor: (state) => {
      state.isRunning = false;
      state.error = null;
    },
    shopfloorFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  startShopfloor,
  stopShopfloor,
  shopfloorFailure,
} = shopfloorSlice.actions;

export default shopfloorSlice.reducer;