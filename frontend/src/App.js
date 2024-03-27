import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage'; // Import the RegisterPage component
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component
import HomePage from './components/HomePage'; // Import the HomePage
 import { getUserToken } from './utils/localStorage';

const States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
};

function App() {
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING); 
  
  return ( 
      <div> 
          <Navbar userToken={userToken} setUserToken = {setUserToken} setAuthState = {setAuthState} states={States}/>
            <Routes> 
              <Route path="/" element={<HomePage />} /> {/* Set the default route to render HomePage */}            
              <Route path="/register" element={<RegisterPage userToken={userToken} setUserToken={setUserToken} setAuthState = {setAuthState} states={States}/>} /> 
              <Route path="/login" element={<LoginPage  userToken={userToken} setUserToken={setUserToken} states={States} setAuthState = {setAuthState} />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>  
      </div> 
  );
}

export default App;
