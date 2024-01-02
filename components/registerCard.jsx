import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FaceNameCard from './faceName';
import { useAppContext } from './authProvider';
import { color } from './color';
// import { ScrollView } from 'react-native-gesture-handler';

const RegisterCard = () => {
    const navigation = useNavigation();
    const { pressCount, cards, removeCard } = useAppContext();

    const handleRemoveCard = (index) => {
        removeCard(index);
      };
    
    return(
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
                    <ScrollView style ={styles.nameBox}>
                    {/* <FaceNameCard /> */}
                    {cards.map((card, index) => 
                        <View key={index}>
                            {card}
                        </View>
                        )}
                    </ScrollView>
                
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    faceContainer:{
        height:300,
        width: '100%',
        backgroundColor: color.secondary,
        borderRadius: 18,
        padding: 10,
        overflow: 'scroll'
    },
    // body: {
    //     height: '100%',
    //     justifyContent: 'space-around'
    // },
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
        // alignItems: 'center',
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
    }, 
    nameBox: {
        // alignItems: 'center',
        paddingLeft: '4%',
        paddingTop: 15,
        // overflow: 'scroll'
        // width: 10
    },
})

export default RegisterCard;