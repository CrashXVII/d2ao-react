import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Navigation from './Components/Navigation';
import RouteManager from './Components/RouteManager';
import { UserContext } from './Contexts';
import 'normalize.css';
import './global.css';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [guardians, setGuardians] = useState([]);

  const getGuardians = async (platforms) => {
    if (platforms.length > 0) {
      const data = platforms.map(async ({ membershipType, membershipId }) => {
        const characters = await fetch(`/api/GetCharacterList/${membershipType}/${membershipId}`);
        const json = await characters.json();
        console.log(json);
        return json.characters;
      })
      const guardianList = await Promise.all(data);
      return setGuardians(...guardianList);
    }
    return setGuardians([]);
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const data = await fetch(`/auth/checkAuth`);
      const res = await data.json();
      setIsLoggedIn(res);
    }
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const updateUserProfile = async () => {
      console.log('Fetching Current User Info');
      const data = await fetch(`/api/Profile/GetCurrentUser`);
      const res = await data.json();
      const userProfile = await res.userProfile;
      if (userProfile) {
        setUserProfile({ ...userProfile });
        setPlatforms([...userProfile.platforms]);
        getGuardians([...userProfile.platforms]);
      }
    }
    if (isLoggedIn) {
      updateUserProfile();
    }
  }, [isLoggedIn]);


  return (
    <UserContext.Provider value={{ isLoggedIn, userProfile, platforms, guardians }}>
      <Router>
        <div className="App">
          <Navigation />
          <RouteManager />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
