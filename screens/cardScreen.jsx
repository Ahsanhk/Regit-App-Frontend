import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DefaultCreditCard from '../components/defaultCreditCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppContext } from '../components/authProvider';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialIcons";
import { address } from '../components/networkAddress';
import Container from '../components/background';
import { color } from '../components/color';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CardScreen = () => {
    const [cardData, setCardData] = useState([]);
    const navigation = useNavigation();

    const { userData } = useAppContext();
    const ip_address = address.ip_address;

    useFocusEffect(
        React.useCallback(() => {
        const user_id = userData._id;
        getCardData(user_id);
    }, [])
    );
  
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


 return (
    <Container>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon name="arrow-back-ios" size={20} color="#dedfe0" />
            </TouchableOpacity>
            <Text
            style={{
                color: "#dedfe0",
                fontSize: 20,
                marginLeft: '30%'
            }}
            >
            My Cards
            </Text>
        </View>

            <ScrollView >
                <View style={styles.container}>
                    {cardData && cardData.length > 0 ? (
                        cardData.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.cardContainer}
                            onPress={() => navigation.navigate('Card-Details', { cardDetails: card })}
                        >
                            <DefaultCreditCard
                            bankName={card.bankName}
                            cardNumber={card.cardNumber}
                            issuedate={card.issuedate}
                            balance={card.balance}
                            getCardData={getCardData}
                            />
                        </TouchableOpacity>
                        ))
                    ) : (
                        <View style={{height:responsiveHeight(35), justifyContent: 'center'}}>
                            <Text style={{fontSize: 20}}>No card added yet :(</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Card-Register')}>
                        <Text style={{fontSize: 16, color: color.icon}}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    header: {
        backgroundColor: color.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        fontSize: 24,
        color: color.icon,
    },
    cardContainer: {
      width: '100%',
      height: responsiveHeight(28),
      borderRadius: 10,
      padding: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: responsiveHeight(7),
        width: responsiveWidth(55),
        backgroundColor: color.secondary,
        padding: 10,
        borderRadius: 15,
        marginTop: '10%',
        marginBottom: '10%',
    },
  });


export default CardScreen;
