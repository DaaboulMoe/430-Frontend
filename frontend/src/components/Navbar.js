import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import {clearUserToken } from "../utils/localStorage";  //To handle user tokens


function Navbar({ userToken, setUserToken, setAuthState, states}) {  
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ margin: 0 }}>
      <Toolbar classes={{ root: "nav" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Flex Factor
        </Typography> 
        {userToken !== null ? (
          <>
            <Button color="inherit" onClick={() =>{
                      setAuthState(states.PENDING); 
                      clearUserToken();
                      setUserToken(null);
                      navigate("/")}}>
                Logout
            </Button>
            <Button color="inherit" component={Link} to="/profile">My Profile</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
