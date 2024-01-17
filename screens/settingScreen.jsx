import React, { useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';

import Container from '../components/background';
import { color } from '../components/color';
import BottomBar from '../components/bottomBar';
import { FlatList } from 'react-native-gesture-handler';
import SettingsModal from '../components/settingsModal';

const SettingScreen = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)

    const data = [
        { id: '1', icon: 'person', name: 'Profile', onPress: () => navigation.navigate('User') },
        { id: '2', icon: 'instagram', name: 'Follow us on Instagram', onPress: () => openInstaBrowser() },
        { id: '3', icon: 'star', name: 'Rate us', onPress: () => openModal('Rate us') },
        { id: '4', icon: 'share', name: 'Share us', onPress: () => handlePress('Share us') },
        { id: '5', icon: 'privacy-tip', name: 'Privacy Policy', onPress: () => navigation.navigate('Privacy-Policy') },
        { id: '6', icon: 'note', name: 'Terms & Conditions', onPress: () => navigation.navigate('Terms-Conditions') },
        { id: '7', icon: 'logout', name: 'Logout', onPress: () => navigation.navigate('Login') },
      ];

      const openInstagram = async () => {
        const instagramURL = 'https://www.instagram.com/hk_ahsann/';
      
        try {
          const supported = await Linking.canOpenURL(instagramURL);
      
          if (supported) {
            await Linking.openURL(instagramURL);
          } else {
            console.log("Can't open Instagram URL");
          }
        } catch (error) {
          console.error('Error opening Instagram:', error);
        }
      };

      const openInstaBrowser = async () => {
        const instagramURL = 'https://www.instagram.com/hk_ahsann/';
      
        try {
          await Linking.openURL(instagramURL);
        } catch (error) {
          console.error('Error opening Instagram:', error);
        }
      };
    
      const handlePress = (itemName) => {
        console.log(`Pressed: ${itemName}`);
      };

      const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
          <View style={styles.iconContainer}>
            {item.id === '2' ? (
              <Icon name={item.icon} size={24} color={color.secondary} />
            ) : (
              <MaterialIcon name={item.icon} size={24} color={color.secondary} />
            )}
          </View>
          <Text style={styles.settingName}>{item.name}</Text>
          <View style={styles.chevronContainer}>
            <Icon name="chevron-right" size={24} color={color.secondary} />
          </View>
        </TouchableOpacity>
      );

      const openModal = (optionName) => {
        const option = data.find((item) => item.name === optionName);
        if (option) {
          setSelectedOption(option);
          setIsModalVisible(true);
        } else {
          console.error(`Option not found for name: ${optionName}`);
        }
      };
    
      const closeModal = () => {
        setIsModalVisible(false);
        setSelectedOption(null);
      };

      const handleOptionSubmit = (option, rating) => {
        console.log(`Submitted: ${option.name} with rating ${rating}`);
      };

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
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.container}
                    />
            </View>
            <SettingsModal isVisible={isModalVisible} onClose={closeModal} option={selectedOption} onSubmit={handleOptionSubmit} />

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