import React, { useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, Image, TextInput, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';

import Container from '../components/background';
import { color } from '../components/color';
import BottomBar from '../components/bottomBar';

const SettingScreen = () => {
    return(
        <Container>
            <View style = {styles.header}>
                <Icon 
                name = 'chevron-left'
                color = 'white'
                size = {28}
                />
                <Text style= {{color: 'white', fontSize: 20}}>
                Settings
                </Text>
                <MaterialIcon 
                name = 'settings'
                size = {24}
                color = {color.secondary}
                />
            </View>
            <View style ={styles.body}>
                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="person" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Profile</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="history" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>History</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="star" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Rate us</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="share" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Share us</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="privacy-tip" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Privacy Policy</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="support-agent" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Support</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </View>
                
                <TouchableOpacity style={styles.optionContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name="logout" size={24} color="#333" />
                    </View>
                    <Text style={styles.settingName}>Logout</Text>
                    <View style={styles.chevronContainer}>
                        <Icon name="chevron-right" size={24} color="#333" />
                    </View>
                </TouchableOpacity>
            </View>

        </Container>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: color.secondary,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
    body: {
        // flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option:{
        height: 50,
        width: 350,
        backgroundColor: color.input,
        marginTop: 20,
        borderRadius: 10
    },
    optionContainer: {
        backgroundColor: color.input,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        width: 350,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 15,
    },
    iconContainer: {
        marginRight: 16,
    },
    settingName: {
        flex: 1,
        fontSize: 16,
        color: color.text,
    },
    chevronContainer: {
        marginLeft: 16,
    },
})

export default SettingScreen