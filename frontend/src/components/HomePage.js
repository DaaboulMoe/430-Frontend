import React, { useEffect } from 'react';
import config from '../config'; // Import the config file 
import {States, persona, getKeyByValue} from '../utils/constants'

const HomePage = ({ userToken, setUserType, setAuthState, authState, userType}) => {
     
    async function getRole() {
        return fetch(config.apiUrl + "/get_role", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }, 
        });
    }
    

  async function fetchUserRole() {
    try {
      const response = await getRole();
      const { role } = await response.json();  
      setUserType(role); 
      setAuthState(States.USER_AUTHENTICATED);
    } catch (error) {
      console.error("Error fetching user role:", error);
      // Handle error
    }
  }

  useEffect(() => {
    if (userToken !== null) { 
      fetchUserRole();
      console.log(userType === persona.VENDOR)
    }
  }, [userType]);

  return (
    <div>
      {userToken !== null ? (
        <div>
          <div>Hello World</div>
          {userType === persona.USER && <div>Hello User</div>}
          {userType === persona.ADMIN && <div>Hello Admin</div>}
          {userType === persona.VENDOR && <div>Hello Vendor</div>}
        </div>
      ) : (
        <div>
          <div>Welcome to the Homepage</div>
          <div>Please log in to see personalized content</div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
