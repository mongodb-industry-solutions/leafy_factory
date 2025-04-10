import { createSlice } from "@reduxjs/toolkit";

const shopfloorSlice = createSlice({
  name: "shopfloor",
  initialState: {
    isRunning: false,
    error: null,
    sensorData: [],
    machineDetails: null,
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
    addSensorData: (state, action) => {
      state.sensorData = [...state.sensorData, action.payload]
    },
    setMachineDetails: (state, action) => {
      state.machineDetails = action.payload;
    },
    setMachineDetailsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  startShopfloor,
  stopShopfloor,
  shopfloorFailure,
  addSensorData,
  setMachineDetails,
  setMachineDetailsError,
} = shopfloorSlice.actions;

export default shopfloorSlice.reducer;
