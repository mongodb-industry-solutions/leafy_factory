import React, { useReducer } from 'react'
import WorkOrdersContext from './workOrdersContext'
import WorkOrdersReducer from './workOrdersReducer'
import axiosClient from './../../config/axios'

const WorkOrderState = (props) => {
    const initialState = {
        workOrders: []
    }
    //config de reducers
    const [globalState, dispatch] = useReducer(WorkOrdersReducer, initialState)

    //API
    const getAllWorkOrders = async () => {
        try {
            const res = await axiosClient.get("/workorders/")
            //DB
            const work_orders = res.data.data
            dispatch({
                type: "GET_WORK_ORDERS",
                payload: work_orders
            })
        } catch (error) {
            console.log(error)
        }
    }
    const addWorkOrders = async (dataForm) => {
        console.log(dataForm)
        try {
            await axiosClient.post("/workorders/", dataForm)
            return getAllWorkOrders()
        } catch (error) {
            console.log(error)
        }
    }

    return (        //activate supplier to all components
        <WorkOrdersContext.Provider
            value={{
                workOrder: globalState.workOrders,
                getAllWorkOrders,
                addWorkOrders
            }}
        >
            {props.children}
        </WorkOrdersContext.Provider>
    )
}

export default WorkOrderState