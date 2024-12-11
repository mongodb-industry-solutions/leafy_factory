import React, { useState } from 'react';
import './App.css';
import TextInput from '@leafygreen-ui/text-input';
import { Select, Option } from '@leafygreen-ui/select';
import Button from '@leafygreen-ui/button';
import 'react-refresh/runtime';


function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
    <div className="App">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value })}
          placeholder="Select your role"
          required
        >
          <Option value="Order_Manager">Orders Manager</Option>
          <Option value="MES_Op">MES OPperator</Option>
          <Option value="Shop_sim">Shopfloor simulator</Option>
        </Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
export default App;