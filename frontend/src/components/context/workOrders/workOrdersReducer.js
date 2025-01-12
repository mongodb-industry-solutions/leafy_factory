//To enable only if Redux is not in use

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

export default reducer