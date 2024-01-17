import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { address } from '../components/networkAddress';
import { useAppContext } from '../components/authProvider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import FaceNameCard from '../components/faceName';
import Container from '../components/background';
import { color } from '../components/color';
import Icon from "react-native-vector-icons/MaterialIcons";
import HandIcon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';

const FaceScreen = () => {
  const [faceImages, setFaceImages] = useState([]);

  const navigation = useNavigation();
  const { userData} = useAppContext();
  const user_id = userData._id
  const ip_address = address.ip_address;

  const fetchImages = async(user_id) => {
    try{
        const response = await axios.get(`http://${ip_address}/get-user-faces/${user_id}`)
        // console.log(response.data);

        if (Array.isArray(response.data)) {
            setFaceImages(response.data);
          } else {
            console.error("No user face images found");
            setFaceImages([]); 
          }
    }
    catch(error){
        console.error("error fetching user face Images: ", error)
    }
  }

  
  useFocusEffect(
    React.useCallback(() => {
    const user_id = userData._id;
    fetchImages(user_id);
}, [])
);

  const renderFace = () => {
    if (faceImages.length === 0) {
      return (
        <View style={{height: responsiveHeight(20),justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: responsiveFontSize(2.5),}}>No faces added yet :(</Text>
        </View>
      )
    } 
    else {
      return (
        <View>
          {faceImages.map((face, index) => (
            <FaceNameCard key={face.faceName} faceName={face.faceName} face_id ={face._id} fetchImages={fetchImages} />
          ))}
        </View>
      );
    }
  };
  

  return (
    <Container>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back-ios" size={20} color="#dedfe0" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#dedfe0",
            fontSize: 20,
            paddingLeft: "25%",
          }}
        >
          My Faces
        </Text>
      </View>
        <ScrollView style={styles.container}>
            <Text style={{padding: 10, fontSize: responsiveFontSize(2.3), fontWeight: 'bold'}}>Registered Faces</Text>
            <View style={styles.faceContainer}>
                {renderFace()}
            </View>
            <Text style={{padding: 10, fontSize: responsiveFontSize(2.3), fontWeight: 'bold'}}>Gestures to Learn</Text>
            <View style={styles.faceContainer}>
                <View style={styles.gestureCard}>
                    <HandIcon 
                        name='fist-raised'
                        size={28}
                        color={color.secondary}
                    />
                    <View style={styles.textContainer}>
                        <Text style={{fontWeight: 'bold'}}>Cancel Transaction</Text>
                        <Text>Show fist for a second to end transaction immidiately in case of emergency</Text>
                    </View>
                </View>
                {/* <Text>Coming Soon...</Text> */}
                {/* <View style={styles.gestureCard}>
                    <HandIcon 
                        name='hand-paper'
                        size={28}
                        color={color.secondary}
                    />
                    <View style={styles.textContainer}>
                        <Text style={{fontWeight: 'bold'}}>End Transaction</Text>
                        <Text>Show palm to simply end transaction at any point</Text>
                    </View>
                </View> */}
                {/* <View style={styles.gestureCard}>
                    <HandIcon 
                        name='hand-peace'
                        size={28}
                        color={color.secondary}
                    />
                    <View style={styles.textContainer}>
                        <Text style={{fontWeight: 'bold'}}>Peace</Text>
                        <Text>Show peace sign to let system allow additional person </Text>
                    </View>
                </View> */}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate('Register')}>
                <Text style={styles.addButtonText}>Add Face</Text>
            </TouchableOpacity>
        </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: color.primary,
  },
  header: {
    flex: 0.04,
    flexDirection: "row",
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: "center",
  },
  addButton: {
    width: responsiveWidth(55),
    backgroundColor: color.secondary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: '20%',
    marginTop : '20%',
  },
  addButtonText: {
    color: color.icon,
    fontSize: 16,
  },
  faceContainer: {
    flex: 0.5,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    width: '95%',
    marginLeft: '2.5%',
    // marginBottom: '4%'
},
gestureCard:{
    padding: 10, 
    height: responsiveHeight(10), 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    backgroundColor: '#f7f7f7',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 15,
},
textContainer: {
    marginLeft: 12,
    flex: 1,
  },
});

export default FaceScreen;
