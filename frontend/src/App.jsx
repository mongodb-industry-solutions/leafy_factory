import React, { useEffect, useState } from 'react';
import './App.css';
import TextInput from '@leafygreen-ui/text-input';
import { Select, Option } from '@leafygreen-ui/select';
import Button from '@leafygreen-ui/button';
import 'react-refresh/runtime';
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response_test = await axios.get(`http://localhost:8000/workorders/`);
        setData(response_test.data);
        console.log("Test")
        console.log(response_test)
      } catch (err) {
        setError(err.message); // Save the error message to state
      } finally {
        setLoading(false); // Mark loading as finished
      }
    };

    fetchData();
  }, []);

    // Render the data or loading/error state
    return (
      <div>
        <h1>Axios GET Request</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default App;