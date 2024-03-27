import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material'; 
import config from '../config'; // Import the config file 
import { useNavigate } from "react-router-dom";
import { getUserToken, saveUserToken, clearUserToken } from "../utils/localStorage";  //To handle user tokens
import {States, persona} from '../utils/constants'

const LoginPage = ({ userToken, setUserToken, setAuthState }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '', 
  });

  const backendUrl = config.apiUrl; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div>
          <h2>Login</h2>
          <form onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              login(formData.username, formData.password, setAuthState, setUserToken, navigate, States); // Call login function with username and password
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

function login(username, password, setAuthState, setUserToken, navigate, States) {
  return fetch(config.apiUrl + "/login", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  },
  body: JSON.stringify({
  username: username,
  password: password,
  }),
  })
  .then((response) => response.json())
  .then((body) => {
  setAuthState(States.USER_AUTHENTICATED);
  setUserToken(body.token); 
  saveUserToken(body.token);
  navigate("/");
  }); 
}

export default LoginPage;
export {login};
