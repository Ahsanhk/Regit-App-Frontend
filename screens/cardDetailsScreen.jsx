import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import Toggle from 'react-native-toggle-input'

import Container from '../components/background';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';
import CreditCard from '../components/creditCard';
import BalanceCard from '../components/balanceCard';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultCreditCard from '../components/defaultCreditCard';
import { address } from '../components/networkAddress';
import FaceNameCard from '../components/faceName';

const CardDetailScreen = () => {
  const route = useRoute();
  const { cardDetails } = route.params;

  const ip_address = address.ip_address;
  const card_id = cardDetails._id.$oid

  const navigation = useNavigation();

  const [toggleValue, setToggleValue] = useState(false);
  const [onlinePaymentValue, setOnlinePayementValue] = useState(false);
  const [intWithdrawals, setIntWithdrawals] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);
  const [faceImages, setFaceImages] = useState([]);
  
  const { userData} = useAppContext();

  useEffect(() => {
    const user_id = userData._id; 
    if (cardDetails && cardDetails.activeStatus !== undefined) {
      // console.log(cardDetails);
      setToggleValue(cardDetails.activeStatus);
      setOnlinePayementValue(cardDetails.onlineStatus)
      setIntWithdrawals(cardDetails.intStatus)
      setDefaultValue(cardDetails.default)
      fetchImages(user_id);
    }
  }, [cardDetails]);


  const fetchImages = async(user_id) => {
    try{
        const response = await axios.get(`http://${ip_address}/get-user-faces/${user_id}`)
        // console.log(response.data);

        if (Array.isArray(response.data)) {
            setFaceImages(response.data);
          } else {
            console.error("No user face images found");
            setFaceImages([]); 
          }
    }
    catch(error){
        console.error("error fetching user face Images: ", error)
    }
  }


  const toggleSwitch = async (value) => {
    const cardNumber = cardDetails.cardNumber
    setToggleValue(value);
    try{
        const response = await axios.post(`http://${ip_address}/update-active-status/${cardNumber}`)
        // console.log(response.data)
    }
    catch(error){
        console.error("error setting card activve status ", error)
    }
    };

    const toggleOnlinePayment = async (value) => {
      const cardNumber = cardDetails.cardNumber
      setOnlinePayementValue(value);
      try{
          const response = await axios.post(`http://${ip_address}/update-online-Status/${cardNumber}`)
          // console.log(response.data)
      }
      catch(error){
          console.error("error setting online payment status ", error)
      }
      };

      const toggleIntWithdrawals = async (value) => {
        const cardNumber = cardDetails.cardNumber
        setIntWithdrawals(value);
        try{
            const response = await axios.post(`http://${ip_address}/update-international-status/${cardNumber}`)
            // console.log(response.data);
        }
        catch(error){
            console.error("error setting online payment status ", error)
        }
        };

        const toggleDefault = async (value) => {
          const cardNumber = cardDetails.cardNumber
          const user_id = userData._id
          setDefaultValue(value);

          try{
              const response = await axios.post(`http://${ip_address}/set-default-card?user_id=${user_id}&cardNumber=${cardNumber}`)
              // console.log(response.data);
          }
          catch(error){
              console.error("error setting default payment status ", error)
          }
          };

          const deleteCard = async () => {
            try{
              const response = await axios.delete(`http://${ip_address}/delete-card/${card_id}`);
              // console.log(response.data.message)
              ToastAndroid.show('Card Deleted', ToastAndroid.SHORT);
              navigation.navigate('Home')
            }
            catch(error){
              console.error("error deleting the card: ", error)
            }
          }


    const showToast = async () => {
        ToastAndroid.show('This feature is not available yet', ToastAndroid.SHORT);
    }

    const renderFace = () => {
      if (faceImages.length === 0) {
        return <Text>No faces</Text>;
      } else {
        return (
          <View>
            {faceImages.map((face, index) => (
              <FaceNameCard key={face.faceName} faceName={face.faceName} face_id ={face._id} fetchImages={fetchImages} />
            ))}
          </View>
        );
      }
    };

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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.balanceCardContainer}>
          <BalanceCard balance={cardDetails.balance}/>
        </View>
        <View style={styles.creditCardContainer}>
              <DefaultCreditCard 
                  bankName={cardDetails.bankName}
                  cardNumber={cardDetails.cardNumber}
                  updatedIssueDate={cardDetails.issueDate}
              />
        </View>

        <View style={styles.cardSettingsContainer}>
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
                  thumbColor={onlinePaymentValue ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleOnlinePayment}
                  value={onlinePaymentValue}
                  style = {styles.toggle}
              />
          </View>
          <View style={styles.cardOption}>
              <Text>International Usage</Text>
              <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={intWithdrawals ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleIntWithdrawals}
                  value={intWithdrawals}
                  style = {styles.toggle}
                  trackStyle={styles.switchTrack} 
                  thumbStyle={styles.switchThumb} 
              />
          </View>
          <View style={styles.cardOption}>
              <Text>Default Card</Text>
              <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={intWithdrawals ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleDefault}
                  value={defaultValue}
                  style = {styles.toggle}
                  trackStyle={styles.switchTrack} 
                  thumbStyle={styles.switchThumb} 
              />
          </View>
        </View>
        <View style={styles.faceContainer}>
            <View style={styles.cardTop}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.icon}>
                    <Icon 
                        name='add'
                        size={24}
                        color={'white'}
                    />
              </TouchableOpacity>
                <Text style={styles.text}>Add Face</Text>
            </View>
            <View style={styles.cardBottom}>
                    <ScrollView style ={styles.nameBox} showsVerticalScrollIndicator={false}>
                        {renderFace()}
                    </ScrollView>
                
            </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => deleteCard()}>
            <Text style={{ color: '#dedfe0', fontSize: 18, }}>Delete Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
    switchTrack: {
        backgroundColor: 'white', 
        borderRadius: 15, 
        height: 40, 
      },
      switchThumb: {
        width: 50, 
        height: 250, 
        borderRadius: 25, 
        backgroundColor: 'blue',
      },
  header: {
    flex: 0.04,
    flexDirection: 'row',
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 0.95,
    padding: 10,
  },
  balanceCardContainer: {
    flex: 0.1, 
    paddingTop: 10,
  },
  creditCardContainer: {
    flex: 0.4,
    paddingTop: 10,
    justifyContent: 'center',
  },
  cardSettingsContainer: {
    flex: 0.6,
    padding: 20,
    height: '100%',
    width: '100%'
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
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: '25%',
    width: '60%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 50
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
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7D9'
    },
    faceContainer:{
      flex: 0.1,
      width: '100%',
      backgroundColor: color.secondary,
      borderRadius: 18,
      padding: 10,
      overflow: 'scroll'
  },
  icon: {
    paddingTop: 10,
  },
  text: {
    color:color.icon,
    padding: 10,
  },
  cardTop: {
    height:'100%',
    flex: 2,
    flexDirection:'row',
    alignContent: 'center',
    // backgroundColor:'blue',
  },
  cardBottom: {
    flex: 8,
    backgroundColor:color.box,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  }, 
  nameBox: {
    paddingLeft: '4%',
    paddingTop: '5%',
  },
  
});

export default CardDetailScreen;
