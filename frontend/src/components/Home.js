import React, { useContext, useEffect } from 'react'
import WorkOrdersContext from './../context/workOrders/workOrdersContext';

export default function Home() {
    const ctxWorkOrders = useContext(WorkOrdersContext);

    const {
        workOrders,
        getAllWorkOrders
    } = ctxWorkOrders;

    useEffect(() => {
        getAllWorkOrders();
    }, [getAllWorkOrders]);

    return (
        <>
            <h1>pls funciona</h1>
            <div>
                {workOrders && workOrders.length > 0 ? (
                    <ul>
                        {workOrders.map((workOrder, index) => (
                            <li key={index}>{workOrder.name}</li> 
                        ))}
                    </ul>
                ) : (
                    <p>No work orders found</p>
                )}
            </div>
        </>
    );
}