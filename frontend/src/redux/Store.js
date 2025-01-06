import { configureStore } from "@reduxjs/toolkit";
import WorkOrdersReducer from './slices/WorkOrderslice'

export const Store = configureStore({
    reducer: {
        "WorkOrders": WorkOrdersReducer,
    //     "Jobs": CartReducer,
    //     "ShopFloor": FavoritesReducer
    }
})