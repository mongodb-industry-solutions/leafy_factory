import './App.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
//import ArchOverview from './components/Overview';
//import { Route, Routes } from 'react-router-dom';
//import ErrorPage from './components/ErrorPage'
//import Factory from './components/Factory';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

    </div>
  );
}

export default App;
