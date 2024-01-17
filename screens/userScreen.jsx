import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../components/authProvider';
import ImagePicker from 'react-native-image-picker';

import happy from '../assets/happi.png';
import Container from '../components/background';
import { color } from '../components/color';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatList } from 'react-native-gesture-handler';

const UserScreen = () => {
    const { userData, userProfilePicture} = useAppContext();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [photo, setPhoto] = useState(null);
    const user_id = userData._id;

  const data = [
    { key: 'email', label: 'Email address', value: userData.email },
    { key: 'id-card', label: 'CNIC', value: userData.cnicNumber },
    { key: 'cellphone', label: 'Mobile Number', value: userData.mobileNumber },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.textOutput}>
      {item.key !== 'username' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcon name={item.key} size={28} color={color.secondary} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>{item.label}</Text>
        </View>
      ) : (
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.label}</Text>
      )}
      <Text style={{ fontSize: 14 }}>{item.value}</Text>
    </View>
  );

  const apiUrl = 'https://api.cloudinary.com/v1_1/dlk8tzdu3/image/upload';
  const cloudinaryUploadPreset = 'profile-pictures'; 

  const openImagePicker = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('Image picker canceled');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        setPhoto(response);
      }
    });
  };

  const uploadImageToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('upload_preset', cloudinaryUploadPreset);
      formData.append('cloud_name', 'dlk8tzdu3');
      formData.append('api_key', '994623638344852'); 

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const responseData = await response.json();
      const imageUrl = responseData.url;

      ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setPhoto(null); 
  };
  const openModal = () => {
    setIsModalVisible(true);
  };


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
              name = 'power-settings'
              size = {24}
              color = {color.secondary}
            />
          </View>

          <View style = {styles.profileBox}>
            <View style = {styles.image}>
                    <Image
                        source={happy}
                        style={styles.image}
                        resizeMode="cover"
                    />
            </View>
            <View style={styles.nameBox}>
              <Text style= {{color: 'black', fontSize: 22, fontWeight: 'bold'}}>{userData.fullName}</Text>
              {/* <TouchableOpacity style={styles.button} onPress={() => {setIsModalVisible(true)}}>
                <Text style={{color: 'white', fontSize: 18}}>Edit Profile</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {photo ? (
                <Image source={{ uri: photo.uri }} style={styles.previewImage} />
              ) : null}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={openImagePicker}>
                  <Text style={styles.uploadText}>Upload Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadImageToCloudinary}>
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </Modal>

          <View style = {styles.infoBox}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', marginBottom: '10%'}}>My Information</Text>
            {/* <ScrollView> */}
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={styles.container}
            />
            {/* </ScrollView> */}
          </View>
          <View style={{width: '100%', alignItems: 'center',}}>
            <TouchableOpacity style={styles.button}>
              <Text style={{color:color.icon, fontSize: 16}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </Container>
    );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.secondary,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileBox: {
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // alignItems: 'center'
  },
  
  image: {
    width: responsiveHeight(15),
    height: responsiveWidth(30),
    borderRadius: 1000,
    marginBottom: '5%'
  },
  button: {
    backgroundColor: 'red',
    marginTop: '30%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(45),
  },

  infoBox: {
    // flex: 1,
    padding: 25,
    // backgroundColor: 'white'
  },

  textOutput: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: color.input,
    height: responsiveHeight(7.5),
    width: responsiveWidth(85),
    marginTop: 10,
    borderRadius: 15,
    paddingLeft: 15,
    padding: 10,
    justifyContent: 'space-between',  
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
  modalContent: {
    width: '80%',
    padding: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  uploadText: {
    color: 'blue',
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },


})

export default UserScreen;
