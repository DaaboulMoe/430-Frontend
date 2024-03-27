import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage'; // Import the RegisterPage component
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component
import HomePage from './components/HomePage'; // Import the HomePage


function App() {
  let [userToken, setUserToken] = useState(false);
  return ( 
      <div> 
          <Navbar userToken={userToken} setUserToken={setUserToken}/>
            <Routes> 
              <Route path="/" element={<HomePage />} /> {/* Set the default route to render HomePage */}            
              <Route path="/register" element={<RegisterPage userToken={userToken} setUserToken={setUserToken} />} /> 
              <Route path="/login" element={<LoginPage  userToken={userToken} setUserToken={setUserToken} />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>  
      </div> 
  );
}

export default App;
