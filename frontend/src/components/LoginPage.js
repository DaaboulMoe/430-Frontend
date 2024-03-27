import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material'; 
import config from '../config'; // Import the config file 
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '', 
  });

  const backendUrl = config.apiUrl;
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
      const response = await fetch(backendUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password, // Send the hashed password
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // Handle successful login
      console.log('Login successful');
      setUserToken(true);
      navigate("/");

    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div>
          <h2>Login</h2>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
