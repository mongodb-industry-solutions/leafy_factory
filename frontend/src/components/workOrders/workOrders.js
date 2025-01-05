import React, { useReducer } from 'react'
import axiosClient from './../../config/axios'

const WorkOrders = (props) => {
    const initialState = {
        workOrders: []
    }
    //config de reducers -> update
    const [globalState, dispatch] = useReducer(WorkOrdersReducer, initialState)

    const reducer = (globalState, action) => {

        switch (action.type) {
            case "GET_WORK_ORDERS":
                return {
                    ...globalState,
                    workOrders: action.payload
                }
            case "ADD_WORKORDER":
                return {
                    ...globalState,
                    workOrders: [
                        ...globalState.workOrders,
                        action.payload
                    ]
                }
            default:
                return globalState
        }
    }
    
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

    return (        
        <WorkOrdersContext.Provider //declared above
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



export default WorkOrders