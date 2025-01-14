import { configureStore } from "@reduxjs/toolkit";
import WorkOrdersReducer from './slices/WorkOrderslice'
import JobsReducer from './slices/JobSlice'
import ShopFloorReducer from './slices/ShopFloorslice'

export const Factory = configureStore({
    reducer: {
        "WorkOrders": WorkOrdersReducer,
        "Jobs": JobsReducer,
        "ShopFloor": ShopFloorReducer
    }
})