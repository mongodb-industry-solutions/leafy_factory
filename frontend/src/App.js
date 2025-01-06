import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArchOverview from './components/Overview';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage'

const text = <h2>Work Orders History and to be submitted here:</h2>;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <Routes>
        <Route path="/overview" element={<ArchOverview />} />
        <Route component={ErrorPage} />
      </Routes>
      
      <div className="App">{text}</div>

    </div>
  );
}

export default App;
