import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage'; // Import the RegisterPage component
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component
import HomePage from './components/HomePage'; // Import the HomePage
import { getUserToken } from './utils/localStorage';
import {States, persona} from './utils/constants'


function App() {
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING); 
  let [userType, setUserType] = useState(persona.USER);


// userToken, setUserType, setAuthState, userType, persona, States
  return ( 
      
      <div>  
          <Navbar userToken={userToken} setUserToken = {setUserToken} setAuthState = {setAuthState}/>
            <Routes> 
              <Route path="/" element={<HomePage userToken= {userToken} setUserType= {setUserType} authState= {authState} setAuthState= {setAuthState}  userType= {userType}/>} /> {/* Set the default route to render HomePage */}            
              <Route path="/register" element={<RegisterPage userToken={userToken} setUserToken={setUserToken} setAuthState = {setAuthState}/>} /> 
              <Route path="/login" element={<LoginPage setUserType={setUserType} userToken={userToken} setUserToken={setUserToken} setAuthState = {setAuthState} />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>  
      </div> 
  );
}

export default App;
