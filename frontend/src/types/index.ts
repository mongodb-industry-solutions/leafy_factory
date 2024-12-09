export interface WorkOrder {
    id: string;
    productName: string;
    quantity: number;
    status: 'created' | 'completed';
    createdAt: string;
    dueDate: string;
  }