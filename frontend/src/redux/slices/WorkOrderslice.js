import { createSlice } from "@reduxjs/toolkit";

const WorkOrderslice = createSlice({
  name: "WorkOrders",
  initialState: {
    workOrders: [],
    treeOrders: [],
    selectWorkOrder: null, 
  },
  reducers: {
    addOrder: (state, action) => {
      state.workOrders.push(action.payload);
    },
    removeOrder: (state, action) => {
      // TODO develop after
      //state = state.filter(product => product.id !== action.payload.id)
      return state;
    },
    setAllOrders: (state, action) => {
      return {
        ...state,
        workOrders: action.payload,
      };
    },
    setTreeOrders: (state, action) => {
      state.treeOrders = action.payload;
    },
    setSelectWorkOrder: (state, action) => {
      state.selectWorkOrder = action.payload;
    },
  },
});

export const {
  addOrder,
  removeOrder,
  setAllOrders,
  setTreeOrders,
  setSelectWorkOrder, 
} = WorkOrderslice.actions;

export default WorkOrderslice.reducer;
