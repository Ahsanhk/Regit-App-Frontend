import React, { createContext, useContext, useState } from 'react';
import {ToastAndroid} from 'react-native';
import FaceNameCard from './faceName';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [pressCount, setPressCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const incrementPressCount = () => {
    if (pressCount < 4) {
      setPressCount(pressCount + 1);
      setCards([...cards, <FaceNameCard key={pressCount} cards={pressCount} />]);
    }
    else{
        ToastAndroid.show('max face limit reached', ToastAndroid.SHORT);
    }
  };

  const getUserData = async (username) => {
    try{
      const response = await axios.get(`http://192.168.50.75:8000/get-user-data/${username}`);
      console.log(response.data);
      setUserData(response.data);
      await fetchImages(username);
    }
    catch(error){
      console.error("error fetching user data: ", error)
    }
  };
  
  const fetchImages = async (username) => {
    try{
      const fetchUserImages = await axios.get(`http://192.168.50.75:8000/get-user-images/${username}`);
      setUserProfilePicture(fetchUserImages.data.profilePicture);
    }
    catch(error){
      console.error("error fetching images: ",error)
    }
  }


  return (
    <AppContext.Provider value={{ 
        pressCount, 
        incrementPressCount, 
        cards, 
        getUserData, 
        userData,
        userProfilePicture,
      }}>
      {children}
    </AppContext.Provider>
  );
};
