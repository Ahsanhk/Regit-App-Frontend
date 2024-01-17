import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Container from '../components/background';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';
import { address } from '../components/networkAddress';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CardRegistrationScreen = () => {
  const navigation = useNavigation();

  const ip_address = address.ip_address;

  const { userData} = useAppContext();
  const [banksList] = useState([
    'Allied Bank',
    'Habib Bank',
    'Al Habib',
    'Meezan Bank',
    'UBL',
    'Habib Metro',
  ]);

  const [errors, setErrors] = useState({});
  const [bankName, setBankName] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [pincode, setPincode] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [cardNumbers, setCardNumbers] = useState(['', '', '', '']);


  const handleRegister = async () => {
    const newErrors = {};

    const cardNumber = cardNumbers.join('');


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


      if (!pincode.trim()) {
        newErrors.pincode = 'Issue Date is required';
      } else if (!/^\d{4}$/.test(pincode)) {
        newErrors.pincode = 'Pincode should be 4 digits';
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
    const issuedate = `${month}/${updatedYear}`;
    const userId = userData._id

    const cardData = {
      userId,
      bankName,
      cardNumber,
      issuedate,
      pincode,
    };

    // console.log('card data:', cardData);

    await registerCard(cardData);

  };

  const registerCard = async (cardData) => {
    try{
      const response = await axios.post(`http://${ip_address}/store-card-info`, cardData)
      // console.log("response in card register ",response)
      navigation.navigate('Home');
    }
    catch(error){
      console.error("error registering card ", error)
    }
  };

  const handleBankNameChange = (text) => {
    setBankName(text);
    const filtered = banksList.filter((bank) =>
      bank.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  const selectBank = (selectedBank) => {
    setBankName(selectedBank);
    setFilteredBanks([]);
  };

  const handleCardNumberChange = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      const updatedCardNumbers = [...cardNumbers];
      updatedCardNumbers[index] = text;
      setCardNumbers(updatedCardNumbers);

      if (text.length === 4 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };


  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: '5%', marginLeft: '2%'}}>Bank Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            placeholderTextColor={color.placeholderText}
            value={bankName}
            onChangeText={handleBankNameChange}
          />
        </View>
        <View>
          {filteredBanks.length > 0 && (
            <View style={styles.dropdownContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredBanks}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectBank(item)}>
                    <Text style={styles.dropdownItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.toString()}
              />
            </View>
          )}
          {errors.bankName && <Text style={styles.errorText}>{errors.bankName}</Text>}
        </View>
        
        <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: '5%', marginRight: '60%'}}>Card number</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {Array.from(Array(4)).map((_, index) => (
            <TextInput
              key={index.toString()}
              ref={inputRefs[index]}
              style={styles.cardInput}
              maxLength={4}
              keyboardType="numeric"
              value={cardNumbers[index]}
              onChangeText={(text) => handleCardNumberChange(text, index)}
            />
          ))}
        </View>
          {errors.cardNumbers && <Text style={styles.errorText}>{errors.cardNumbers}</Text>}
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: '2%', marginLeft: '2.5%'}}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              placeholderTextColor={color.placeholderText}
              value={pincode}
              onChangeText={(text) => setPincode(text)}
              secureTextEntry 
              keyboardType="numeric" 
              maxLength={4}
            />
            {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
          </View>
          
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: '2%', marginRight: '65%'}}>Issue Date</Text>
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
  header: {
    flexDirection: 'row',
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    flex: 0.1,
    marginTop: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
  },
  content: {
    flex: 0.7,
    alignItems: 'center',
    position: 'relative'
  },
  input: {
    backgroundColor: color.input,
    width: responsiveWidth(85),
    color: color.text,
    padding: 15,
    borderRadius: 15,
    marginTop: '2%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  buttonBox: {
    flex: 0.3,
    alignItems: 'center',
  },
  button: {
    marginTop: '20%',
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
  dropdownContainer: {
    position: 'absolute',
    top: 80,
    zIndex: 1,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: responsiveHeight(25),
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 5,
    padding: 10,
    width: '85%'
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
  },
  cardInput: {
    backgroundColor: color.input,
    marginTop: 25,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '20%', 
    padding: 10,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 4,
    borderRadius: 15,
    textAlign: 'center',
    height: 70,
  },  
});

export default CardRegistrationScreen;
