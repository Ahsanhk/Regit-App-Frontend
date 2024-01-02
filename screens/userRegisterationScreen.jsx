import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/background';
import { color } from '../components/color';

const UserRegisterationScreen = () => {
    const [errors, setErrors] = useState({});
    

    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        cnicNumber: '',
        mobileNumber: '',
    });



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validateMobileNumber = (mobileNumber) => {
        const mobileRegex = /^\+?92[0-9]{10}$/;
        return mobileRegex.test(mobileNumber);
    };
    
      const validateCnicNumber = (cnicNumber) => {
        const cnicRegex = /^[0-9]{13}$/;
        return cnicRegex.test(cnicNumber);
      };

    const navigateToAccountInfo = () => {
        const newErrors = {};
    
        if (!validateEmail(userInfo.email)) {
          newErrors.email = 'Invalid email address';
        }
    
        if (!validateMobileNumber(userInfo.mobileNumber)) {
          newErrors.mobileNumber = 'Invalid mobile number';
        }
    
        if (!validateCnicNumber(userInfo.cnicNumber)) {
          newErrors.cnicNumber = 'Invalid CNIC number';
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          navigation.navigate('Account-Info', { userInfo });
        }
      };
    

    const handleInputChange = (key, value) => {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          [key]: value,
        }));
    };

    


    return (
        <Container>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Icon
                        name='arrow-back-ios'
                        size={18}
                        color= {color.icon}
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
                        fontSize: 22,
                        fontWeight: 'bold',
                    }}
                >
                    User Information
                </Text>
            </View>

            <View style={styles.content}>
                {/* <Text>Full Name</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='full name'
                    placeholderTextColor={color.placeholderText}
                    value={userInfo.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='email address'
                    placeholderTextColor={color.placeholderText}
                    value={userInfo.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder='cnic number'
                    placeholderTextColor={color.placeholderText}
                    value={userInfo.cnicNumber}
                    onChangeText={(text) => handleInputChange('cnicNumber', text)}
                />
                {errors.cnicNumber && (
                    <Text style={styles.errorText}>{errors.cnicNumber}</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder='mobile number'
                    placeholderTextColor={color.placeholderText}
                    value={userInfo.mobileNumber}
                    onChangeText={(text) => handleInputChange('mobileNumber', text)}
                />
                {errors.mobileNumber && (
                    <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                )}
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.button} onPress={navigateToAccountInfo}>
                    <Text style={{ color: '#dedfe0', fontSize: 18, }} >Continue</Text>
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

export default UserRegisterationScreen;