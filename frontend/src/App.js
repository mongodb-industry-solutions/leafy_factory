import './App.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArchOverview from './components/Overview';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage'
import WorkOrders from './components/workOrders';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <div className="routes">
        <Routes>
          <Route path="/" element={<WorkOrders />} />
          <Route path="/workorders" element={<WorkOrders />} />
          <Route path="/jobs" element={<h3>Jobs Tab</h3>} />
          <Route path="/shopfloor" element={<h3>Shopfloor Simulator (Disabled)</h3>} />
          <Route path="/overview" element={<ArchOverview />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
