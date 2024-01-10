import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { color } from './color';

const DefaultCreditCard = (cardData) => {

    const cardNumber = cardData.cardNumber;
    const formattedCardNumber = cardNumber.match(/.{1,4}/g).join('      ');

    // console.log("data in credit card: ", cardData)

    return(
        <ImageBackground
            source={require('../bg_dblue.png')}
            style={styles.container}
            imageStyle={styles.container}
        >
            {/* <View style={styles.container}> */}
                <View style={styles.body}>
                    
                    <Text style={styles.text}>{cardData.bankName}</Text>
                    <Text style={styles.text}>{formattedCardNumber}</Text>
                    <Text style={styles.text}>Valid Thru {'\n'} {cardData.updatedIssueDate}</Text>
                
                </View>
            {/* </View> */}
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
        justifyContent: "space-around",
        paddingLeft: 20,
        marginBottom: 50
    },
    text: {
        color:'white',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
})

export default DefaultCreditCard;