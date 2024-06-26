import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from './color';

const BalanceCard = ({balance}) => {
    return(
    <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.text}>Your Balance</Text>
            <Text style={{color:'#C2DFF4', padding: 10, fontSize: 26}}>Rs.{balance}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 80,
        width: '100%',
        backgroundColor: color.secondary,
        borderRadius: 18,
        padding: 10,
    },
    body: {
        height: '100%',
        justifyContent: 'space-around'
    },
    text: {
        color:color.icon,
        padding: 10,
    },
})

export default BalanceCard;