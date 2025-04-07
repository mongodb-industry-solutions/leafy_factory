import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShrunk: false,
};

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isShrunk = !state.isShrunk;
    },
    setSidebarShrunk(state, action) {
      state.isShrunk = action.payload;
    },
    openSidebar(state) {
      state.isShrunk = false;
    },
    resetSidebar(state) {
      state.isShrunk = false;
    },
  },
});

export const { 
toggleSidebar, 
setSidebarShrunk, 
openSidebar,
resetSidebar
} = SidebarSlice.actions;

export default SidebarSlice.reducer;
