import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './components/Home';
import WorkOrders from './components/workOrders';
import WorkOrdersDetails from './components/workOrderDetails';
import WorkOrderState from './context/workOrders/workOrdersState';
import PublicRoute from './components/Routes/PublicRoute';

function App() {
  return (
    <>
      <WorkOrderState>
        <Router>
          <Header />
          <Routes> 

            <Route path="/workorders/" element={<PublicRoute component={WorkOrders} />} /> 
            <Route path="/workorders/:work_id" element={<PublicRoute component={WorkOrdersDetails} />} />
            <Route path="/" element={<PublicRoute component={Home} />} />
            
          </Routes>
        </Router>
      </WorkOrderState>

    </>
  );
}

export default App;
