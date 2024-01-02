import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from '../components/authProvider';

import Container from '../components/background';
import { color } from '../components/color';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
    const { userData, userProfilePicture} = useAppContext();
    const navigation = useNavigation();

    return(
        <Container >
          <View style = {styles.header}>
            <TouchableOpacity>
                <Icon 
                name = 'chevron-left'
                color = 'white'
                size = {28}
                onPress={() => navigation.navigate('Home')}
                />
            </TouchableOpacity>
            <Text style= {{color: 'white', fontSize: 20}}>
              My Profile
            </Text>
            <MaterialIcon 
              name = 'settings'
              size = {24}
              color = {color.secondary}
            />
          </View>

          <View style = {styles.profileBox}>
            <View style = {styles.image}>
                    <Image
                        source={{ uri: userProfilePicture }}
                        style={styles.image}
                        resizeMode="cover"
                    />
            </View>
            <View style={styles.nameBox}>
              <Text style= {{color: 'black', fontSize: 22, fontWeight: 'bold'}}>{userData.fullname}</Text>
              <TouchableOpacity style={styles.button} onPress={() => {/* handle press */}}>
                <Text style={{color: 'white', fontSize: 18}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style = {styles.infoBox}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>My Information</Text>
            {/* <ScrollView> */}
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 16, fontWeight: 'bold' }}>User name</Text>
                <Text style = {{fontSize: 14, }}>{userData.fullname}</Text>
              </View>
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 16, fontWeight: 'bold' }}>Email address</Text>
                <Text style = {{fontSize: 14, }}>{userData.email}</Text>
              </View>
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 16, fontWeight: 'bold' }}>CNIC</Text>
                <Text style = {{fontSize: 14, }}>{userData.cnicNumber}</Text>
              </View>
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 16, fontWeight: 'bold' }}>Mobile Number</Text>
                <Text style = {{fontSize: 14, }}>{userData.mobileNumber}</Text>
              </View> 
            {/* </ScrollView> */}
          </View>
        </Container>
    );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.secondary,
    padding: 15,
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  profileBox: {
    // backgroundColor: 'white',
    // flex: 0.25,
    margin: 10,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // alignItems: 'center'
  },
  
  image: {
    // backgroundColor: '#b3b3b3',
    // flex: 0.6,
    width: 120,
    height: 120,
    borderRadius: 1000,
  },
  
  nameBox:{
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    // paddingRight: 20
  },

  button: {
    backgroundColor: color.button,
    // padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 150,
  },

  infoBox: {
    // flex: 1,
    padding: 25,
    // backgroundColor: 'white'
  },

  textOutput: {
    backgroundColor: color.input,
    height: 70,
    width: 340,
    marginTop: 30,
    borderRadius: 15,
    justifyContent: 'space-evenly',  
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 5,
    borderColor: '#ddd',
    borderWidth: 1
  },

})

export default UserScreen;
