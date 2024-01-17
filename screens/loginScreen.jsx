import React, { useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, Image, TextInput, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import happy from '../assets/happi.png';
import Container from '../components/background';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';
import { address } from '../components/networkAddress';

const LoginScreen = () => {
    
    const navigation = useNavigation();

    const ip_address = address.ip_address;

    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { getUserData } = useAppContext();


    const handleAuthentication = async () => {
        try {
            const response = await axios.get(`http://${ip_address}/authentication?username=${username}&password=${password}`);
            const data = response.data;
            
    // console.log(username);
    // console.log(password);
            
            if (data == true) {
                await getUserData(username);
                navigation.navigate('Home');
            } 
            else {
                ToastAndroid.show('incorrect username or password', ToastAndroid.SHORT);
            }
        } 
        catch (error) {
            ToastAndroid.show('incorrect username or password', ToastAndroid.SHORT);
            error.log(error);
        }
    };

    return(      
        <Container>
            <View style={styles.textContainer}>
                <Image 
                    source={happy}
                    style = {styles.image}
                />
                <Text style={styles.text}>regit</Text>
                {/* <Text>Log in, feel safe!</Text> */}
            </View>
            <View style = {styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder= 'username'
                    placeholderTextColor={color.placeholderText}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    color = {color.text}
                />
                <TextInput
                    style={styles.input}
                    placeholder='password'
                    placeholderTextColor={color.placeholderText}
                    secureTextEntry= {true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    color = {color.text}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Sms')}>
                    {/* <Text style={{marginTop: 25, paddingLeft: 150}}>Forgot your password?</Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
                    <Text style={{color: '#dedfe0', fontSize:18,}}>Login </Text>
                </TouchableOpacity>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}><Text style={{color: color.button, fontWeight: 'bold'}}>Sign up</Text></TouchableOpacity>     
                {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Test")}>
                    <Text style={{color: '#dedfe0', fontSize:16,}}> Test Screen</Text>
                </TouchableOpacity>        */}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: color.secondary,
        alignItems: 'center',
        justifyContent:'center',
        padding: 20,
    },
    
    textContainer: {
        // backgroundColor: 'yellow',
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom:20,
        // marginBottom: 20,
    },
    inputContainer: {
        // marginTop: 30,
        flex: 0.4,
        alignItems: 'center',
        // backgroundColor: 'black',
        paddingLeft: 25,
        paddingRight: 25,
    },
    buttonContainer: {
        // backgroundColor: 'blue',
        // flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: '10%',
        paddingRight: 20,
        paddingLeft: 20,
    },
    text: {
        color: color.text,
        fontSize: 26,  
        fontFamily: 'monospace',
        fontWeight: 'bold',
        marginTop: 5,
    },
    image: {
        width: 85,
        height: 71,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: color.button,
        borderRadius: 15,
        marginBottom: 15,
        color: color.icon
    },
    input: {
        backgroundColor: color.input,
        width: '90%',
        color: color.input,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
});

export default LoginScreen;