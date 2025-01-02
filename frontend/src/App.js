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

      </workOrderState>
    <>
  );
}

export default App;
