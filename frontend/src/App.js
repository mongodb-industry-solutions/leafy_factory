import './App.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArchOverview from './components/Overview';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage'
import WorkOrders from './components/workOrders';
import Jobs from './components/Jobs';
import Shopfloor from './components/Shopfloor'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <div className="routes">
        <Routes>
          <Route path="/" element={<WorkOrders />} />
          <Route path="/workorders" element={<WorkOrders />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/shopfloor" element={<Shopfloor />} />
          <Route path="/overview" element={<ArchOverview />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
