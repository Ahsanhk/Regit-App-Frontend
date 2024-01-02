import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Container from '../components/background';
import { color } from '../components/color';

const MobilePhoneEnter = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handleContinue = async () => {
    const mobileNumberRegex = /^\+92\d{10}$/;
    if (!mobileNumberRegex.test(mobileNumber)) {
      setError('Invalid mobile number format. Please enter a valid number in +92xxxxxxxxxx format.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.20:8000/generate-otp', {
        mobileNumber: mobileNumber,
      });

      const actualOtp = response.data;

      console.log(actualOtp);
      if (response) {
        navigation.navigate('OTP', {actualOtp});
      } 
      else {
        setError('Failed to generate OTP. Please try again.');
      }
    } 
    catch (error) {
      console.log('An error occurred. Please try again later.', error);
    }
  };

  return (
    <Container>
      <View style={styles.heading}>
        <Text style={{ color: color.text, fontSize: 22, fontWeight: 'bold' }}>Enter Mobile Number</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder='Enter Mobile Number (+92xxxxxxxxxx)'
          placeholderTextColor={color.placeholderText}
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          keyboardType='phone-pad'
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={{ color: '#dedfe0', fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    flex: 0.1,
    marginTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center'
  },
  content: {
    flex: 0.9,
    alignItems: 'center',
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    width: '40%',
    backgroundColor: color.button,
    padding: 10,
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default MobilePhoneEnter;
