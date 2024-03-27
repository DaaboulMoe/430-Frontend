import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 

function Navbar({ userToken, setUserToken }) {  

  return (
    <AppBar position="static" style={{ margin: 0 }}>
      <Toolbar classes={{ root: "nav" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Flex Factor
        </Typography>
        {console.log(userToken)}
        {userToken ? (
          <>
            <Button color="inherit" onClick={() =>{setUserToken(false);}}>Logout</Button>
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
