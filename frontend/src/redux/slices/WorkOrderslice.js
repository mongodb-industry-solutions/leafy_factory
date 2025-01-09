import { createSlice } from "@reduxjs/toolkit";

const WorkOrderslice = createSlice({
    name: "WorkOrders",
    initialState: {
        workOrders: [],
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
    }
})

export const {
    addOrder, 
    removeOrder,
    setAllOrders
} = WorkOrderslice.actions

export default WorkOrderslice.reducer