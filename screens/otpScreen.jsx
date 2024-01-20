import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/background';
import { color } from '../components/color';
import axios from 'axios';
import { address } from '../components/networkAddress';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const route = useRoute();

  const ip_address = address.ip_address;

  const userData = route.params.userData
  const otpId = route.params.otpId

  const handleOtp = async () => {
    const otpValData = {
      otpId,
      otp,
    }
    try{
      // console.log(otpValData)
      const response = await axios.post(`http://${ip_address}/validate-otp`, otpValData);
      console.log(response.data);
      
      if(response.data.isMatched){
        registerUser();
      }
      else{
          ToastAndroid.show('Incorrect otp',ToastAndroid.SHORT);
      }
    }
    catch(error){
      console.error("error validating otp: ", error)
    }

  }

  const registerUser = async () => {
    try {
          const response = await axios.post(`http://${ip_address}/register`, userData);

          if(response.status == 200){
            ToastAndroid.show('User registered successfully',ToastAndroid.SHORT);
            navigation.navigate('Login');
          }
          else{
              const responseBody = await response.text();
              console.error('Failed to register user. Status:', response.status);
              // console.error('Response Body:', responseBody);
          }
      } 
      catch (error) {
          console.error('Data not sent:', error.message);
      }
  }

  const handleOtpInputChange = (input) => {
    setOtp(input);
  };

  const handleContinue = () => {
    if (otp.length === 6) {
      ToastAndroid.show('User registered successfully', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } else {
      setError('Invalid OTP. Please enter a 6-digit OTP.');
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-back-ios' size={18} color={color.icon} />
        </TouchableOpacity>
        <Text style={{ color: '#dedfe0', fontSize: 20, paddingLeft: '25%' }}>OTP Verification</Text>
      </View>
      <View style={styles.heading}>
        <Text style={{ color: color.text, fontSize: 22, fontWeight: 'bold' }}>Enter OTP</Text>
      </View>
      <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder='Enter OTP'
        placeholderTextColor={color.placeholderText}
        value={otp}
        onChangeText={setOtp}  
        keyboardType='numeric'
        maxLength={6}
      />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={handleOtp}>
          <Text style={{ color: '#dedfe0', fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: 'center'
  },
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

export default OtpScreen;
