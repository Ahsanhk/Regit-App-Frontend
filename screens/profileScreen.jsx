import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/background';
import { ScrollView } from 'react-native-gesture-handler';
// import BottomBar from '../components/bottomBar';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';
// import { Button } from 'react-native-paper';

const ProfileScreen = () => {
    const { userData} = useAppContext();
    return(
        <Container >
          <View style = {styles.header}>
            <Icon 
              name = 'chevron-left'
              color = 'white'
              size = {28}
            />
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
            </View>
            <View style={styles.nameBox}>
              <Text style= {{color: 'black', fontSize: 22, fontWeight: 'bold'}}>John Doe</Text>
              <TouchableOpacity style={styles.button} onPress={() => {/* handle press */}}>
                <Text style={{color: 'white', fontSize: 18}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style = {styles.infoBox}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>My Information</Text>
            <ScrollView>
              {/* <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 18, }}>John Doe</Text>
              </View> */}
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 18, }}>johndoe17@gmail.com</Text>
              </View>
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 18, }}>33104-3690828-5</Text>
              </View>
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 18, }}>0333-7010789</Text>
              </View> 
            </ScrollView>
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
    alignItems: 'center'
  },

  profileBox: {
    // backgroundColor: 'white',
    // flex: 0.25,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
    // alignItems: 'center'
  },
  
  image: {
    backgroundColor: '#b3b3b3',
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
    flex: 1,
    padding: 25,
    // backgroundColor: 'yellow'
  },

  textOutput: {
    backgroundColor: color.input,
    height: 50,
    width: 340,
    marginTop: 30,
    borderRadius: 25,
    justifyContent: 'center',  
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

})

export default ProfileScreen;