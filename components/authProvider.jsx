import React, { createContext, useContext, useState } from 'react';
import {ToastAndroid} from 'react-native';
import FaceNameCard from './faceName';
import axios from 'axios';
import { address } from './networkAddress';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const ip_address = address.ip_address;

  const getUserData = async (username) => {
    try{
      const response = await axios.get(`http://${ip_address}/get-user-data/${username}`);
      // console.log(response.data);
      setUserData(response.data);
      await fetchImages(username);
    }
    catch(error){
      console.error("error fetching user data: ", error)
    }
  };
  
  const fetchImages = async (username) => {
    try{
      const response = await axios.get(`http://${ip_address}/get-user-images/${username}`);
      setUserProfilePicture(response.data.profilePicture);
    }
    catch(error){
      console.error("error fetching images: ",error)
    }
  }


  return (
    <AppContext.Provider value={{  
        cards, 
        getUserData, 
        userData,
        userProfilePicture,
      }}>
      {children}
    </AppContext.Provider>
  );
};
