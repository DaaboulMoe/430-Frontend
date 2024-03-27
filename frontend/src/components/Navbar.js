import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { clearUserToken } from "../utils/localStorage";  // To handle user tokens
import {States, persona} from '../utils/constants'

function Navbar({ userToken, setUserToken, setAuthState }) {  
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ margin: 0}}>
      <Toolbar classes={{ root: "nav" }} style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Flex Factor
        </Typography> 
        <div>
          <div style={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '5px', paddingLeft: '20px', paddingRight: '20px' }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{ color: 'inherit' }} // Adjust padding
            />
            <IconButton type="submit" aria-label="search"> 
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div>
          {userToken !== null ? (
            <>
              <Button color="inherit" onClick={() => {
                setAuthState(States.PENDING); 
                clearUserToken();
                setUserToken(null);
                navigate("/");
              }}>
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
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
