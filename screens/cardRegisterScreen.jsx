import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Container from '../components/background';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';

const CardRegistrationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { userData} = useAppContext();

  const [errors, setErrors] = useState({});
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');


  const handleRegister = async () => {
    const newErrors = {};

    if (!bankName.trim()) {
        newErrors.bankName = 'Bank Name is required';
      } else if (!/^[a-zA-Z ]+$/.test(bankName)) {
        newErrors.bankName = 'Bank Name should contain only letters';
      }

      if (!cardNumber.trim()) {
        newErrors.cardNumber = 'Card Number is required';
      } else if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'Card Number should be a 16-digit number';
      }

      if (!issueDate.trim()) {
        newErrors.issueDate = 'Issue Date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(issueDate)) {
        newErrors.issueDate = 'Invalid Date format (MM/YY)';
      }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const [month, year] = issueDate.split('/');
    const updatedYear = parseInt(year, 10) + 5;
    const updatedIssueDate = `${month}/${updatedYear}`;
    const username = userData.username

    const cardData = {
        username,
        bankName,
        cardNumber,
        updatedIssueDate,
        activeStatus
      };

    console.log('Sending data:', cardData);
    await registerCard(cardData);

    navigation.navigate('Home', { cardData });

  };

  const registerCard = async (cardData) => {
    try{
      const response = await axios.post("http://192.168.50.75:8000/store-card-details",{cardData})
      console.log("response in card register ",response)
    }
    catch(error){
      console.error("error registering card ", error)
    }
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
          Card Registration
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
          Card Information
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          placeholderTextColor={color.placeholderText}
          value={bankName}
          onChangeText={(text) => setBankName(text)}
        />
        {errors.bankName && <Text style={styles.errorText}>{errors.bankName}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor={color.placeholderText}
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
        />
        {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Issue Date"
          placeholderTextColor={color.placeholderText}
          value={issueDate}
          onChangeText={(text) => setIssueDate(text)}
        />
        {errors.issueDate && <Text style={styles.errorText}>{errors.issueDate}</Text>}
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={{ color: '#dedfe0', fontSize: 18 }}>Register</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  // ... other styles ...

  header: {
    flexDirection: 'row',
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    flex: 0.1,
    marginTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
  },
  content: {
    flex: 0.7,
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
    flex: 0.3,
    alignItems: 'center',
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

export default CardRegistrationScreen;
