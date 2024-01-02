import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation, useRoute, NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Container from '../components/background';
import { color } from '../components/color';

const AccountRegisterationScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [pincode, setPincode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleRegister = async () => {

        const userInfo = route.params?.userInfo || {};
        // console.log('Sending data:', userInfo);
        const userData = {
            ...userInfo,
            username,
            pincode,
            password,
        };

        console.log(userData.mobileNumber);

        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
          } else if (username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters';
          }
      
          if (!pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
          } else if (!/^\d{4}$/.test(pincode)) {
            newErrors.pincode = 'Pincode must be a 4-digit number';
          }
      
          if (!password.trim()) {
            newErrors.password = 'Password is required';
          } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
          }
      
          if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
      
          setErrors(newErrors);
      
          if (Object.keys(newErrors).length > 0) {
            return;
          }
        

        // console.log('Sending data:', userData);
        // navigation.navigate('Login', {userData});
        // const mobileNumber = userData.mobileNumber
        
        try {
            const response = await axios.post('http://192.168.100.8:8000/generate-otp', {
              mobileNumber: userData.mobileNumber,
            });

            console.log(userData.mobileNumber)

            const actualOtp = response.data;

            console.log(actualOtp);
            if (response) {
              navigation.navigate('OTP', {actualOtp, userData});
            } 
            else {
              setError('Failed to generate OTP. Please try again.');
            }
          } 
          catch (error) {
            console.log('An error occurred. Please try again later.', error);
          }




        // try {
        //     const response = await axios.post('http://192.168.50.75:8000/signup/', userData);

        //     if(response.status == 200){
        //         // const responseBody = await response.json();
        //         // const userId = responseBody.user_id;
        //         navigation.navigate('MobilePhone');
        //     }
        //     else{
        //         const responseBody = await response.text();
        //         console.error('Failed to register user. Status:', response.status);
        //         console.error('Response Body:', responseBody);
        //     }
        // } 
        // catch (error) {
        //     console.error('Data not sent:', error.message);
        // }
    };


  return (
    <Container>
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Icon 
                        name='arrow-back-ios'
                        size={20}
                        color= '#dedfe0'
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#dedfe0',
                        fontSize: 20, 
                        paddingLeft: '25%'                       
                    }}
                >
                    Registeration
                </Text>
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
                Account Information
            </Text>
        </View>
        
        <View style={styles.content}>
            {/* <Text>Full Name</Text> */}
            <TextInput
                style={styles.input}
                placeholder= 'username'
                placeholderTextColor={color.placeholderText}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput
                style={styles.input}
                placeholder= '****'
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={true}
                placeholderTextColor={color.placeholderText}
                value={pincode}
                onChangeText={(text) => setPincode(text)}
            />
            {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
            <TextInput
                style={styles.input}
                placeholder= 'password'
                placeholderTextColor={color.placeholderText}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TextInput
                style={styles.input}
                placeholder= 'confirm password'
                placeholderTextColor={color.placeholderText}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}
        </View>
        <View style = {styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={{color: '#dedfe0', fontSize:18,}} >
                    Register
                </Text>
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
        flex: 0.7,
        alignItems: 'center',
    },
    text: {
        color: 'white',
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
    buttonBox:{
        flex: 0.3,
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

export default AccountRegisterationScreen;