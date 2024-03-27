import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import config from '../config'; // Import the config file 
import { useNavigate } from "react-router-dom";
import { login } from "./LoginPage";

const RegisterPage = ({ userToken, setUserToken, setAuthState, states }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
    full_name: '',
    phone_number: '',
    address: ''
  });
 
  const backendUrl = config.apiUrl
  console.log(backendUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function createUser(username, password, role, email, full_name, phone_number, address){ 
    const response = fetch(backendUrl + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
        email: email,
        full_name: full_name,
        phone_number: phone_number,
        address: address
      }),
    })
    .then((response) => login(username, password, setAuthState, setUserToken, navigate, states)); 
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div>
          <h2>Register</h2>
          <form onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              createUser(formData.username, formData.password, formData.role, formData.email, formData.full_name, formData.phone_number, formData.address); // Call login function with username and password
          }}>
            <TextField
              label="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            
            <TextField
              type="text"
              label="Name"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="address"
              label="Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="tel"
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="email"
              label="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="End User">End User</MenuItem>
              </Select>
          </FormControl>


            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
