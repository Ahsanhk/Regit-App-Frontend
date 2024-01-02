import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { color } from './color';

const CreditCard = (cardData) => {
    const cardNumber = cardData.cardNumber;
    const formattedCardNumber = cardNumber.match(/.{1,4}/g).join('  ');


    const generateRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generates a random hexadecimal color
        return randomColor;
      };

    // console.log("data in credit card: ", cardData)

    return(
    <ImageBackground 
        source={require('../bg_dblue.png')}
        // style={styles.container}
        imageStyle={styles.container}
    >
        <View style={styles.body}>
            
            <Text style={styles.text}>{cardData.bankName}</Text>
            <Text style={styles.text}>{formattedCardNumber}</Text>
            <Text style={styles.text}>Valid Thru {'\n'} {cardData.updatedIssueDate}</Text>
        </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 120,
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
        color:'white',
        padding: 10,
        fontSize: 12,
        // fontWeight: 'bold'
    },
})

export default CreditCard;