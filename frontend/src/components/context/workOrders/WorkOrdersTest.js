//To enable only if Redux is not in use

import { useState, useEffect } from "react";

function WorkOrders (props) {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    setWorkOrders(props.workOrders);
  }, [props.workOrders]);


  return (
    <div>
      <h1>Work Orders History</h1>
      {workOrders.map((project) => {
        return (
          <div key={workOrders._id} className="workorder">
            <h3>{workOrders.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default WorkOrders;
