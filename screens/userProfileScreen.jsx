import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/background';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from '../components/color';
import { useAppContext } from '../components/authProvider';

const UserProfileScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null); 
  const { userData } = useAppContext();
  const user_id = userData._id;

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
      // Handle saving the imageUrl to your backend or wherever needed
      // ...

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
              <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                <Text style={{color: 'white', fontSize: 18}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
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
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default UserProfileScreen;