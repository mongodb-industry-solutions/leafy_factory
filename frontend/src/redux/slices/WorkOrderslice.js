import { createSlice } from "@reduxjs/toolkit";

const WorkOrderslice = createSlice({
    name: "WorkOrders",
    initialState: {
        workOrders: [],
        treeOrders: [],
    },
    reducers: {
        addOrder: (state, action) => {
          state.workOrders.push(action.payload);
        },
        removeOrder: (state, action) => {
            // TODO develop after
            //state = state.filter(product => product.id !== action.payload.id)
            return state
        },
        setAllOrders: (state, action) => {
            return {
                ...state,
                workOrders: action.payload
            }
        },
        setTreeOrders: (state, action) => {
            state.treeOrders = action.payload;
        },
    }
})

export const {
    addOrder, 
    removeOrder,
    setAllOrders,
    setTreeOrders
} = WorkOrderslice.actions

export default WorkOrderslice.reducer