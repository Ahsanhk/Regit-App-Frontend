import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from './color';
// import Icon from 'react-native-vector-icons/Feather';

const BottomBar = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <TouchableOpacity 
                    style={styles.icons}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Icon 
                        name='home'
                        size={24}
                        color= {color.icon}
                    />
                    <Text style={styles.iconText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.icons}
                    onPress={() => navigation.navigate('History')}
                >
                    <Icon 
                        name='history'
                        size={24}
                        color= {color.icon}
                    />
                    <Text style={styles.iconText}>Transactions</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.icons}
                    onPress={() => navigation.navigate('User')}
                >
                    <Icon 
                        name='person'
                        size={24}
                        color= {color.icon}
                    />
                    <Text style={styles.iconText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.icons}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Icon 
                        name='settings'
                        size={24}
                        color= {color.icon}
                    />
                    <Text style={styles.iconText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: color.secondary,
    },
    body: {
        height:'100%',
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around'  
    },
    text: {
        color: color.text,
        fontSize: 18, 
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        color: color.icon,
    },
})

export default BottomBar;