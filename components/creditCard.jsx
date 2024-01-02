import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from './color';

const CreditCard = (cardData) => {

    // console.log("data in credit card: ", cardData)

    return(
    <View style={styles.container}>
        <View style={styles.body}>
            
            <Text style={styles.text}>{cardData.bankName}</Text>
            <Text style={styles.text}>{cardData.cardNumber}</Text>
            <Text style={styles.text}>Valid till {'\n'} {cardData.updatedIssueDate}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 200,
        width: '100%',
        backgroundColor: color.secondary,
        borderRadius: 18,
        padding: 10,
    },
    body: {
        height: '100%',
        justifyContent: "space-around",
    },
    text: {
        color:'white',
        padding: 10,
    },
})

export default CreditCard;