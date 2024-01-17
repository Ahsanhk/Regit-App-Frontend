import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { color } from './color';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const CreditCard = (cardData) => {
    const cardNumber = cardData.cardNumber;
    const maskedCardNumber = cardNumber.replace(/.(?=.{4})/g, '*');
    const formattedCardNumber = maskedCardNumber.match(/.{1,4}/g).join('   ');

    return(
    <ImageBackground 
        source={require('../bg_dblue.png')}
        imageStyle={styles.container}
    >
        <View style={styles.body}>
            <Text style={styles.text}>{cardData.bankName}</Text>
            <Text style={styles.text}>{formattedCardNumber}</Text>
            <Text style={styles.text}>Valid Thru {'\n'} {cardData.issuedate}</Text>
        </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        height: responsiveHeight(16),
        width: '100%',
        backgroundColor: color.secondary,
        borderRadius: 18,
        padding: 10,
        opacity: 0.7
    },
    body: {
        height: '100%',
        justifyContent: "space-around",
        paddingLeft: 5
    },
    text: {
        color:'#f5f5f5',
        padding: 10,
        fontSize: responsiveFontSize(1.5),
    },
})

export default CreditCard;