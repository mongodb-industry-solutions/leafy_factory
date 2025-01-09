import { configureStore } from "@reduxjs/toolkit";
import WorkOrdersReducer from './slices/WorkOrderslice'
import JobsReducer from './slices/JobSlice'

export const Factory = configureStore({
    reducer: {
        "WorkOrders": WorkOrdersReducer,
        "Jobs": JobsReducer,
    //     "ShopFloor": FavoritesReducer
    }
})