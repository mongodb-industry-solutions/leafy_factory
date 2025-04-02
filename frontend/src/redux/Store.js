import { configureStore } from "@reduxjs/toolkit";
import WorkOrdersReducer from './slices/WorkOrderslice'
import JobsReducer from './slices/JobSlice'
import ShopFloorReducer from './slices/ShopFloorslice'
import SidebarReducer from './slices/SidebarSlice';
//import WebSocketReducer from './slices/WebSocketSlice'

export const Factory = configureStore({
    reducer: {
        "WorkOrders": WorkOrdersReducer,
        "Jobs": JobsReducer,
        "ShopFloor": ShopFloorReducer,
        "Sidebar": SidebarReducer
        //"WebSocket": WebSocketReducer
    },
})