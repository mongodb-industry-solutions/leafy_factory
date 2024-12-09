import React, { useState } from 'react';
import { WorkOrderForm } from '../components/workOrderForm';
import { WorkOrderList } from '../components/WorkOrderList';

export function WorkOrderPage() {

  const [workOrders, setWorkOrders] = useState([]);
  const handleCreateWorkOrder = (workOrderData) => {
    const newWorkOrder = {
      id: `WO-${Date.now()}`,
      ...workOrderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setWorkOrders([newWorkOrder, ...workOrders]);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WorkOrderForm onSubmit={handleCreateWorkOrder} />
        <WorkOrderList workOrders={workOrders} />
      </div>
    </div>
  );
}
