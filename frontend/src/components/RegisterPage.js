import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import config from '../config'; // Import the config file 
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(backendUrl + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to register');
      }

      // Handle successful registration
      console.log('Registration successful');
      navigate("/");

    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="End User">End User</MenuItem>
              </Select>
            </FormControl>
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
