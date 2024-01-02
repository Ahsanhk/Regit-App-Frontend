import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

import Container from '../components/background';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';
import CreditCard from '../components/creditCard';

const CardDetailScreen = () => {
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);
  const [toggleValue, setToggleValue] = useState(false);

  useEffect(() => {
    if (cardData && cardData.activeStatus !== undefined) {
      setToggleValue(cardData.activeStatus);
    }
    
  }, [cardData]);

  const { userData} = useAppContext();

  useEffect(() => {
    const username = userData.username; 
    fetchCardData(username);
}, [])

  const fetchCardData = async (username) => {
    try{
      const fetchCardData = await axios.get(`http://192.168.50.75:8000/get-user-cards/${username}`);
    //   console.log(fetchCardData.data);
      setCardData(fetchCardData.data);
    }
    catch(error){
      console.error("error fetching Card Data: ",error)
    }
  }

  const toggleSwitch = async (value) => {
    const username = userData.username
    setToggleValue(value);
    try{
        const response = await axios.post(`http://192.168.50.75:8000/update-active-status/${username}`)
        console.log(response.data)
    }
    catch(error){
        console.error("error setting card activve status ", error)
    }
    };

    const showToast = async () => {
        ToastAndroid.show('This feature is not available yet', ToastAndroid.SHORT);
    }

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Icon name="arrow-back-ios" size={20} color="#dedfe0" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#dedfe0',
            fontSize: 20,
            paddingLeft: '25%',
          }}
        >
          My Cards
        </Text>
      </View>

      <View style={styles.content}>
            <CreditCard 
                bankName={cardData.bankName}
                cardNumber={cardData.cardNumber}
                updatedIssueDate={cardData.updatedIssueDate}
            />
      </View>

      <View style={styles.heading}>
        <Text
          style={{
            color: color.text,
            fontSize: 20,
            paddingBottom: 10,
            fontWeight: 'bold',
          }}
        >
          Card Settings
        </Text>
        <View style={styles.cardOption}>
            <Text>ATM Withdraws</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={toggleValue}
                style = {styles.toggle}
                trackStyle={styles.switchTrack} 
                thumbStyle={styles.switchThumb} 
            />
        </View>
        <View style={styles.cardOption}>
            <Text>Online Payment</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={showToast}
                // value={toggleValue}
                style = {styles.toggle}
            />
        </View>
        <View style={styles.cardOption}>
            <Text>International Usage</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={showToast}
                style = {styles.toggle}
                trackStyle={styles.switchTrack} // Apply custom track style
                thumbStyle={styles.switchThumb} // Apply custom thumb style
            />
        </View>
      </View>

      {/* <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={{}}>
          <Text style={{ color: '#dedfe0', fontSize: 18, }}>Add Card</Text>
        </TouchableOpacity>
      </View> */}
    </Container>
  );
};

const styles = StyleSheet.create({
    switchTrack: {
        backgroundColor: 'orange', // Track color when false
        borderRadius: 15, // Adjust the border radius for the "tucked-in" appearance
        height: 20, // Set the height of the track
      },
      switchThumb: {
        width: 30, // Adjust the width of the thumb
        height: 30, // Adjust the height of the thumb
        borderRadius: 15, // Make the thumb round
        backgroundColor: '#f5dd4b', // Thumb color when true
      },
  header: {
    flexDirection: 'row',
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    marginTop: '10%',
    padding: 15,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: color.input,
    width: '85%',
    color: color.text,
    padding: 18,
    borderRadius: 15,
    marginTop: 30,
    fontSize: 16,
  },
  buttonBox: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    width: '60%',
    backgroundColor: color.button,
    padding: 10,
    borderRadius: 15,
    marginTop: 50
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  cardOption: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7D9'
    },
  
});

export default CardDetailScreen;
