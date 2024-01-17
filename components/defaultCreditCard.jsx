import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { color } from './color';

const DefaultCreditCard = (cardData) => {

    const cardNumber = cardData.cardNumber;
    const maskedCardNumber = cardNumber.replace(/.(?=.{4})/g, '*');
    const formattedCardNumber = maskedCardNumber.match(/.{1,4}/g).join('   ');

    // console.log("data in credit card: ", cardData)

    return(
        <ImageBackground
            source={require('../bg_dblue.png')}
            // style={styles.container}
            imageStyle={styles.container}
        >
            <View style={styles.body}>
                <View style={styles.cardTop}>
                    <Text style={styles.text}>{cardData.bankName}</Text>
                </View>
                <View style={styles.cardMid}>
                    <Text style={{fontSize: 16, color:'#f5f5f5', paddingLeft: '2%'}}>Rs.</Text>
                    <Text style={{fontSize: 28, color: '#f5f5f5'}}>{cardData.balance}</Text>
                </View>
                <View style={styles.cardBottom}>
                    <Text style={styles.text}>{formattedCardNumber}</Text>
                    <Text style={styles.text}>Valid Thru {'\n'} {cardData.issuedate}</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#1a6fa3',
        borderRadius: 18,
        // padding: 25,
        opacity: 0.8,
    },
    body: {
        height: '100%',
        justifyContent: "center",
        // paddingLeft: 20,
        // marginBottom: 50
    },
    cardTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 10,
    },
    cardMid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    cardBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingBottom: 10,
    },
    text: {
        color:'white',
        padding: 10,
        fontSize: 16,
    },
})

export default DefaultCreditCard;