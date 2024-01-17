import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import happy from '../assets/happi.png';

import BottomBar from '../components/bottomBar';
import BalanceCard from '../components/balanceCard';
import RegisterCard from '../components/registerCard';
import { color } from '../components/color';
import CreditCard from '../components/creditCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAppContext } from '../components/authProvider';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import FaceNameCard from '../components/faceName';
import DefaultCreditCard from '../components/defaultCreditCard';
import { address } from '../components/networkAddress';
import FacesContainer from '../components/facesContainer';
import TransactionCard from '../components/transactionCard';

const HomeScreen = () => {
    const navigation = useNavigation();

    const { userData, userProfilePicture} = useAppContext();
    const [cardData, setCardData] = useState([]);
    const [faceImages, setFaceImages] = useState([]);
    const [cardId, setCardId] = useState(null);
    const [defaultCard, setDefaultCard] = useState(null);
    const [userTransactions, setUserTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // const transactionData = userTransactions.reverse();
    const slicedTransactions = userTransactions.slice(0,4);
    const ip_address = address.ip_address;
    
    useFocusEffect(
        React.useCallback(() => {
        const user_id = userData._id
        // console.log(userData)

        fetchImages(user_id);
        getCardData(user_id);
        // findDefaultCard(user_id);
        // fetchProfilePicture(username);
    }, [])
    );

    
    // const findDefaultCard = async (user_id) => {
    //     try{
    //         const response = await axios.get(`http://${ip_address}/get-default-card/${user_id}`);
    //         // console.log(response.data);
    //         setUserTransactions(response.data.transactions);
    //     }
    //     catch(error){
    //         console.error("error fetching trans data  ", error)
    //     }
    //     finally{
    //         setLoading(false);
    //     }
    //   }

      const getCardData = async (user_id) => {
        try{
            const response = await axios.get(`http://${ip_address}/get-cards/${user_id}`);
            // console.log("cards data: ",response.data);
            
            if (Array.isArray(response.data)) {
                setCardData(response.data);
                // console.log("card data: ",cardData)
              } 
            else {
                setCardData([]);
                // console.log("card data in else: ",cardData);
              }
        }
        catch(error){
            console.error("error fetching cards data", error)
        }
      }

      const fetchImages = async(user_id) => {
        try{
            const response = await axios.get(`http://${ip_address}/get-user-faces/${user_id}`)
            // console.log(response.data);

            if (Array.isArray(response.data)) {
                setFaceImages(response.data);
              } 
              else {
                setFaceImages([]);
                // console.log("face images in else: ",faceImages);
              }
        }
        catch(error){
            console.error("error fetching user face Images: ", error)
        }
      }

    const renderFace = () => {
        if (faceImages.length === 0) {
          return (
            <View style={{height: responsiveHeight(20),justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2.5),}}>No faces added yet :(</Text>
            </View>
          )
        } 
        else {
          return (
            <View>
              {faceImages.map((face, index) => (
                <FaceNameCard key={face.faceName} faceName={face.faceName} face_id ={face._id} fetchImages={fetchImages} />
              ))}
            </View>
          );
        }
      };

    const checkDefaultTrue = (card) => {
        return (
            <TouchableOpacity style={{width: '100%',height:  responsiveHeight(26)}} onPress={()=>navigation.navigate('Card-Details', { cardDetails: card, userTransactions: userTransactions }) }>
                <DefaultCreditCard
                    bankName={card.bankName}
                    cardNumber={card.cardNumber}
                    issuedate={card.issuedate}
                    balance={card.balance}
                    getCardData = {getCardData}
                /> 
            </TouchableOpacity>
            // </View>
        );
      };

      const checkDefaultFalse = () => {
        const nonDefaultCards = cardData.filter((card) => !card.default);
        if (nonDefaultCards.length === 0) {
          return(
            <View style={{height: responsiveHeight(10),justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2.2),}}>No other cards added yet :(</Text>
            </View>
          );
        }
      
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cardData.map((card, index) => {
              if (!card.default) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ padding: 5, width: responsiveWidth(55) }}
                    onPress={() => navigation.navigate('Card-Details', { cardDetails: card })}
                  >
                    <CreditCard
                      bankName={card.bankName}
                      cardNumber={card.cardNumber}
                      issuedate={card.issuedate}
                    />
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </ScrollView>
        );
      };

    function creditCardRender() {
        const defaultCard = cardData.find((card) => card.default);
        if (!defaultCard) {
            return (
              <View style={styles.emptyCard}>
                <Text style={{ fontSize: 24}}>No Cards added yet :(</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Card-Register')}>
                    <Text style={{fontSize: 16, color: color.icon}}>Add Card</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View>
                <View style={{width: '100%',}}>
                  {checkDefaultTrue(defaultCard)}
                </View>
                <View>
                  <ScrollView style={{overflow: 'hidden'}}>
                    <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>Other Cards</Text>
                    <ScrollView>
                      {checkDefaultFalse()}
                    </ScrollView>
                  </ScrollView>
                </View>
              </View>
            );
          }
        }

    return(
        //<SafeAreaView>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View  style={styles.header}>
                    {/* <View style={styles.image}>
                        <Image
                            source={{ uri: userProfilePicture }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View> */}
                    <Image 
                        source={happy}
                        style = {styles.logo}
                    />
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{color: 'white',fontSize: responsiveFontSize(2)}}>Welcome, </Text>
                        <Text style={{color: 'white',fontSize: responsiveFontSize(2)}}>{userData.fullName} </Text>
                    </View>
                    
                    <TouchableOpacity>
                        <Icon 
                            name = 'settings'
                            color = {color.icon}
                            size = {24}
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.body}>
                    
                        <View style={styles.block2}>
                            {creditCardRender()}
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{padding: 10, fontSize: responsiveFontSize(2.3), fontWeight: 'bold'}}>Registered Faces</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('Faces')}>
                                <Text style={{paddingRight: 10, color: 'blue', fontSize:responsiveFontSize(2.0)}}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.faceContainer}>
                            {renderFace()}
                        </View>
                    
                </View>
                </ScrollView>
                <View  style={styles.bottom}>
                    <BottomBar />
                </View>
            </View>
        //</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '100%',
        backgroundColor: color.primary,
    },
    header: {
        backgroundColor: color.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        // backgroundColor: color.secondary,
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        borderRadius: 100,
    },
    logo: {
        height: responsiveHeight(5),
        width: responsiveWidth(11), 
    },
    balanceBox: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 0.9,
        paddingLeft: 10,
        paddingRight: 10,
    },
    bottom: {
        height: responsiveHeight(7.5)
    },
    block1:{
        flex:0.8,
    },
    block2:{
        marginTop: 4,
        paddingTop: 5,
        flex:0.2,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    block3:{
        paddingTop: 5,
        flex:5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    emptyCard: {
        height: responsiveHeight(55),
        marginLeft: '2.5%',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#f7f7f7',
        // opacity: 6,
        padding: 10
      },
      faceName: {
        height: 80,
        backgroundColor: '#D6E3EF',
        borderRadius: 15,
      },
      faceContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 18,
        width: '95%',
        marginLeft: '2.5%',
        marginBottom: '4%'
    },
    icon: {
        paddingTop: 10,
    },
    text: {
        color:color.icon,
        padding: 10,
    },
    transactionContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 18,
        width: '95%',
        marginLeft: '2.5%'
    },
    button: {
        marginTop: responsiveHeight(10),
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(55),
        backgroundColor: color.button,
        padding: 10,
        borderRadius: 15,
    },
});

export default HomeScreen;
