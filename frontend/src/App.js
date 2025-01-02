import logo from './logo.png';
import './App.css';
import {Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Layout/Header';
import Home from './components/Home';
import workOrderState from './context/workOrders/workOrdersState';
import PublicRoute from './components/Routes/PublicRoute';

function App() {
  return (
    <>
      <workOrderState>
        <Router>
          <Header />
          <Switch>

            <PublicRoute eaxct path="/workorders/" component={createWorkOrder}/>
            <PublicRoute eaxct path="/workorders/" component={workOrders}/>
            <PublicRoute eaxct path="/workorders/:work_id" component={workOrderDetails}/>
           <PublicRoute exact path="/" component={Home} />
         
          </Switch>
        </Router>
      </workOrderState>

    </>
  );
}

export default App;
