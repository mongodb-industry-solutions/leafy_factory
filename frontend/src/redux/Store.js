import { configureStore } from "@reduxjs/toolkit";
import WorkOrdersReducer from './slices/WorkOrderslice'

export const Factory = configureStore({
    reducer: {
        "WorkOrders": WorkOrdersReducer,
    //     "Jobs": CartReducer,
    //     "ShopFloor": FavoritesReducer
    }
})