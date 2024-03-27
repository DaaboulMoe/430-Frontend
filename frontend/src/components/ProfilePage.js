// import React, { useState, useEffect } from 'react';
// import { Grid, Typography } from '@mui/material';
// import config from '../config'; // Import the config file 
// import { getUserToken } from '../utils/localStorage';


// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = getUserToken(); // Assuming you store the token in localStorage
//         const response = await fetch(`${config.apiUrl}/profile`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setProfileData(data);
//         } else {
//           // Handle error response
//           console.error('Failed to fetch profile data:', response.statusText);
//         }
//       } catch (error) {
//         // Handle fetch error
//         console.error('Error fetching profile data:', error.message);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   return (
//     <Grid container justifyContent="center">
//       <Grid item xs={12} sm={8} md={6}>
//         <div>
//           <h2>My Profile</h2>
//           {profileData ? (
//             <div>
//               <Typography variant="subtitle1">Full Name: {profileData.full_name}</Typography>
//               <Typography variant="subtitle1">Address: {profileData.address}</Typography>
//               <Typography variant="subtitle1">Phone Number: {profileData.phone_number}</Typography>
//             </div>
//           ) : (
//             <Typography variant="subtitle1">Loading profile data...</Typography>
//           )}
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import config from '../config'; // Import the config file 
import { getUserToken } from '../utils/localStorage';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone_number: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = getUserToken(); // Assuming you store the token in localStorage
        const response = await fetch(`${config.apiUrl}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setFormData({
            full_name: data.full_name,
            address: data.address,
            phone_number: data.phone_number,
          });
        } else {
          // Handle error response
          console.error('Failed to fetch profile data:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

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
      const token = getUserToken(); // Assuming you store the token in localStorage
      const response = await fetch(`${config.apiUrl}/update_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        console.log('Profile updated successfully:', data);
      } else {
        // Handle error response
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div>
          <h2>My Profile</h2>
          {profileData ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </form>
          ) : (
            <Typography variant="subtitle1">Loading profile data...</Typography>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
