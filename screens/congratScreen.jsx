import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import TopBar from '../components/topbar';
import BottomBar from '../components/bottomBar';
import { color } from '../components/color';
import { useNavigation } from '@react-navigation/native';

const CongratsScreen = () => {
    const navigation = useNavigation();

    return(
        //<SafeAreaView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={{justifyContent: 'center', alignItems:'center'}}>
                        <View style={{backgroundColor: '#4E9C37', borderRadius: 250, height: 150, width: 150, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon 
                                name = 'check'
                                color = 'white'
                                size = {148}
                            />
                        </View>
                        <Text style={styles.text}>Face Registered Successfully</Text>
                    </View>
                    <View> 
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Home')}
                            >
                            <Text style={{color: '#dedfe0', fontSize:18,}}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        //</SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '100%',
        backgroundColor: '#3E7297',
    },
    top: {
        flex:0.80,
    },
    body: {
        flex:8.2,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bottom: {
        flex: 1,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: color.button,
        borderRadius: 15,
        marginBottom: 15,
        color: color.icon
    },
    text:{
        paddingTop: 50,
        color: 'white',
        fontSize: 24,

    },
});

export default CongratsScreen;