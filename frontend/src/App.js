import './App.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArchOverview from './components/Overview';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage'
import Factory from './components/Factory';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <div className="routes"> {/* Main content for tab content */}
        <Routes>
          <Route path="/" element={<Factory />} />
          <Route path="/workorders" element={<Factory />} />
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
