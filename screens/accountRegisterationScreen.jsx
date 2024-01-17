import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation, useRoute, NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Container from '../components/background';
import { color } from '../components/color';
import { address } from '../components/networkAddress';

const AccountRegisterationScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const ip_address = address.ip_address;

    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const userInfo = route.params?.userInfo || {};
    // console.log('Sending data:', userInfo);
    const userData = {
        ...userInfo,
        username,
        password,
    };

    const handleRegister = async () => {

        const ip_address = address.ip_address;


        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
          } else if (username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters';
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

          const mobileNumber = userData.mobileNumber;
        
          const isTaken = checkUsername(userData);
          // console.log("return",isTaken)
        };

          const checkUsername = async (userData) => {
            const username = userData.username;
            const mobileNumber = userData.mobileNumber;

            try{
              const response = await axios.get(`http://${ip_address}/check-username/${username}`);

              console.log(response.data.isTaken);
              
              if(response.data.isTaken){
                ToastAndroid.show('username already taken', ToastAndroid.SHORT);
              }
              else{
                generateOTP(mobileNumber);
              }
            }
            catch(error){
              console.error("error checking username: ", error);
            }
          }

          const generateOTP = async(mobileNumber) =>{
            try{
              const response = await axios.post(`http://${ip_address}/generate-otp`, {
                    mobileNumber
                  });              

              console.log(response.data);
              const otpId = response.data.otpId;
              if (response) {
                navigation.navigate('OTP', {otpId ,userData});
              } 
              else {
                console.log('Failed to generate OTP. Please try again.');
              }
            }
            catch(error){
              console.error("error generating otp", error)
            }
          }


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
        borderWidth: 1,
        borderColor: 'lightgray',
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