import React, { useEffect, useState } from 'react'
import {
    useDispatch, // to MODIFY the Store
    useSelector // to ACCESS the store
} from "react-redux";
import axiosClient from '../config/axios';
//import ExpandableCard from '@leafygreen-ui/expandable-card';
//import Card from '@leafygreen-ui/card';

import { setAllOrders } from '../redux/slices/WorkOrderslice';

const WorkOrdersList = () => {
    const dispatch = useDispatch() // dispatch to MODIFY redux state
    const workOrders = useSelector(state => state.WorkOrders.workOrders)

    useEffect(() => {
        // load all work orders once this component gets rendered

        const fetchWorkOrders = async () => {
            try {
                //const response = await fetch('https://rickandmortyapi.com/api/character')
                // TODO replace latter with --> axiosClient.get("/workorders/")
                const response = await axiosClient.get('http://localhost:8000/workorders/')
                console.log('-- getAllWorkOrders', response.data)
                const myWorkOrdersList = response.data
                dispatch(setAllOrders([...myWorkOrdersList]))
            } catch (error) {
                console.error("There was a problem with your fetch operation:", error);
            }
        };

        fetchWorkOrders();
    }, [])


    return (
        <div>
            {
                workOrders.map((order, index) => (
                    <div key={index}>
                        {/* <Card className="card-styles" as="article">
                            This is my card component
                        </Card>; */}
                        <div class="leafygreen-ui-1lu17q2 card-styles card">

                        {order.id_work} - {order.wo_status}
                        </div>
                        {/* <ExpandableCard
                            title='hola'
                            description="..."
                            flagText="optional"
                        >
                            {order.id} - {order.created}
                        </ExpandableCard>; */}

                    </div>
                ))
            }

        </div>
    )
}

export default WorkOrdersList