import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BottomBar from '../components/bottomBar';
// import CreditCard from '../components/card';
import BalanceCard from '../components/balanceCard';
import RegisterCard from '../components/registerCard';
import { color } from '../components/color';
import CreditCard from '../components/creditCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppContext } from '../components/authProvider';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import FaceNameCard from '../components/faceName';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { userData, userProfilePicture} = useAppContext();
    const [toggleValue, setToggleValue] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [faceImages, setFaceImages] = useState([]);

    // const [userProfilePicture, setUserProfilePicture] = useState([]);

    useEffect(() => {
        if (cardData && cardData.activeStatus !== undefined) {
          setToggleValue(cardData.activeStatus);
        }
        
      }, [cardData]);

    // useEffect(() => {
    // if (userProfilePicture !== undefined) {
    //     setUserProfilePicture(userProfilePicture);
    // }
    
    // }, [userProfilePicture]);

    useEffect(() => {
        const username = userData.username;
        const user_id = userData._id; 
        // fetchCardData(username);
        fetchImages(username);
        getCardData(user_id);
        // fetchProfilePicture(username);
    }, [])

    //   const fetchCardData = async (username) => {
    //     try{
    //       const fetchCardData = await axios.get(`http://192.168.50.75:8000/get-user-cards/${username}`);
    //     //   console.log(fetchCardData.data);
    //     //   setCardData(fetchCardData.data);
    //     }
    //     catch(error){
    //       console.error("error fetching Card Data: ",error)
    //     }
    //   }

      const getCardData = async (user_id) => {
        try{
            const response = await axios.get(`http://192.168.50.75:8000/get-cards/${user_id}`);
            console.log(response.data);
            setCardData(response.data);
        }
        catch(error){
            console.error("error fetching cards data ", error)
        }
      }

      const fetchImages = async(username) => {
        try{
            const response = await axios.get(`http://192.168.50.75:8000/get-user-images/${username}`)
            // console.log(response.data.user_faces);
            setFaceImages(response.data.user_faces);
        }
        catch(error){
            console.error("error fetching user face Images: ", error)
        }
      }

    //   const fetchProfilePicture = async (username) => {
    //     try{
    //       const fetchUserProfilePicture = await axios.get(`http://192.168.100.10:8000/get-user-images/${username}`);
    //       console.log(fetchUserProfilePicture.data.profilePicture);
    //       setUserProfilePicture(fetchUserProfilePicture.data.profilePicture);
    //     }
    //     catch(error){
    //       console.error("error fetching images: ",error)
    //     }
    //   }

    const toggleSwitch = async (value) => {
        const username = userData.username
        setToggleValue(value);
        try{
            const response = await axios.post(`http://192.168.50.75:8000/update-active-status/${username}`)
            console.log(response.data)
        }
        catch(error){
            console.error("error setting card activve status ", error)
        }
    };

    function cardStructure(){
        if(cardData.default){
            return(
                <CreditCard 
                    bankName={cardData.bankName}
                    cardNumber={cardData.cardNumber}
                    updatedIssueDate={cardData.issueDate}
                /> 
            )
        }
        if(!cardData.default){
            return(
                <View></View>
            )
        }
    }

    function creditCardRender(){
        // console.log("data recieved: ", cardData)
        if(!cardData){
            return(
                <View style= {styles.emptyCard}>
                    <TouchableOpacity onPress={() => navigation.navigate('Card-Register')}>
                        <Icon 
                            name = 'add'
                            size = {32}
                            color = {color.icon}
                        />
                    </TouchableOpacity>
                    <Text style={{color: color.icon, fontSize: 24}}>Add Card</Text>
                </View>
            )
        }
        else{
            return(
                <TouchableOpacity style={{width: '100%'}} onPress={() => navigation.navigate('Card-Details')}>
                    {cardStructure}
                </TouchableOpacity>
            )
        }
      }

    return(
        //<SafeAreaView>
            <View style={styles.container}>
                <View  style={styles.header}>
                    <View style={styles.image}>
                    {/* {userProfilePicture ? ( */}
                        <Image
                            source={{ uri: userProfilePicture }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        {/* ) : (
                        <View>
                            <Text>Image not available</Text>
                        </View>
                        )} */}
                    </View>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{color: 'white',fontSize: 18}}>Welcome </Text>
                        <Text style={{color: 'white',fontSize: 16}}>{userData.fullname} </Text>
                    </View>
                    
                    <TouchableOpacity>
                        <Icon 
                            name = 'logout'
                            color = {color.icon}
                            size = {24}
                            onPress={() => navigation.navigate('Login')}
                        />
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.body}>
                    {/* <View style={styles.toggleBOdy}>
                        <Text style={{fontWeight: 'bold'}}>Card Status: {toggleValue ? 'Active' : 'Inactive'}</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={toggleValue}
                            style = {styles.toggle}
                        />
                    </View> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.block1}>
                            <BalanceCard />
                        </View>
                        <View style={styles.block2}>
                            {creditCardRender()}
                        </View>
                        <View style={styles.block3}>
                            {/* <RegisterCard /> */}
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
                                        <ScrollView style ={styles.nameBox} showsVerticalScrollIndicator={false}>
                                        {faceImages.map((face, index) => (
                                            <FaceNameCard key={face.faceName} faceName={face.faceName} />
                                        ))}
                                        </ScrollView>
                                    
                                </View>
                        </View>

                        </View>
                    </ScrollView>
                </View>

                <View  style={styles.bottom}>
                    <BottomBar />
                </View>
            </View>
        //</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '100%',
        backgroundColor: color.primary,
    },
    header: {
        backgroundColor: color.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    image: {
        // backgroundColor: color.secondary,
        width: 35,
        height: 35,
        borderRadius: 100,
    },
    balanceBox: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 0.9,
        padding: 10,
        // backgroundColor: 'black'
    },
    bottom: {
        flex: 0.1,
    },
    block1:{
        flex:0.8, 
    },
    block2:{
        paddingTop: 15,
        flex:0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    block3:{
        paddingTop: 15,
        flex:5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    emptyCard: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.secondary,
        borderRadius: 15,
        borderStyle: 'dashed',
        flexDirection: 'row',
        backgroundColor: color.secondary,
        opacity: 6,
        padding: 10
      },
      toggleBOdy: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      toggle: {
        width: 50
      },
      faceBody: {
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth:2,
        borderBottomColor: '#E5E4E0'
      },
      faceName: {
        height: 80,
        backgroundColor: '#D6E3EF',
        borderRadius: 15,
      },
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
});

export default HomeScreen;