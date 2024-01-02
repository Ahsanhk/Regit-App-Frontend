import { StyleSheet, Text,TextInput,Button, TouchableOpacity,Modal, View, ToastAndroid, Platform } from 'react-native';
import React, {useState} from 'react';
import { Camera} from 'expo-camera';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as FaceDetector from 'expo-face-detector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Container from '../components/background';
import TopBar from '../components/topbar';
import { useAppContext } from '../components/authProvider';
import { useNavigation } from '@react-navigation/native';
import { color } from '../components/color';
import { address } from '../components/networkAddress';

const RegistrationScreen = () => {
  const [hasPermission, setHasPermission] = React.useState();
  const [faceData, setFaceData] = React.useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const {userData } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false); 
  const [faceName, setFaceName] = useState('');

  const ip_address = address.ip_address
  const user_id = userData._id
  const navigation = useNavigation();

  React.useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  }

  const noFace = () => {
    ToastAndroid.show('no faces available', ToastAndroid.SHORT)
  }

  const captureImage = () => {
    navigation.navigate('Home', { shouldAddCard: true });
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo);
      // await handleUploadCloudinary(photo);
    }
  };

  const handleUploadCloudinary = async (photo) => {
    const apiUrl = 'https://api.cloudinary.com/v1_1/dlk8tzdu3/image/upload';
    const cloudinaryUploadPreset = 'test_preset';
    // const { uri } = photo;
    // const { x, y, width, height } = faceBounds;
    // const croppedPhoto = await FileSystem.cropAsync({
    //   uri,
    //   rect: { x, y, width, height },
    // });

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
      // console.log(faceName)
      const imageData= {
        user_id,
        imageUrl,
        faceName,
      }
      await sendImageUrlToBackend(imageData);
      ToastAndroid.show("face registered successfully", ToastAndroid.SHORT);
      // console.log('url: ', imageUrl);
    } 
    catch (error) {
      console.error('Error uploading to Cloudinary:', error.message);
    }
  };

  const sendImageUrlToBackend = async (imageData) => {
    try {
      const response = await axios.post(`http://${ip_address}/upload-user-face`, imageData);
    }
    catch (error) {
      console.error('Error sending image URL to backend:', error.message);
    }
  };
  

  const handleImages = async () =>{
    await takePicture();
    setModalVisible(true);
  }

  const uploadData = async () => {
    await handleUploadCloudinary(capturedPhoto);
    navigation.navigate('Congrats');
    // captureImage();
  }

  function setCaptureButton() {
    if(faceData.length == 1){
      return(
        <View>
            <TouchableOpacity onPress={handleImages}>
                <Icon
                    name='camera'
                    size={60}
                    color= {color.primary}
                />
          </TouchableOpacity>
        </View>
      );
    }
    else{
      return(
        <View>
          <TouchableWithoutFeedback onPress= {noFace}>
            <Icon 
                name='camera'
                size={60}
                color= '#495c6b'  
            />
          </TouchableWithoutFeedback>
        </View>
      );

    }
  }

  return (
    <Container>
      <View style={styles.background}>
        <View style= {styles.topbar}>
          <TopBar />
        </View>
        <View style ={styles.text}>
          <Text
            style={{
              color: color.primary,
              fontSize: 24,
              // fontWeight: 'bold'
            }}
          >
            Register your face!
          </Text>
        </View>
        <View style = {styles.cameraAdj}>
          <View style={styles.overlay}>
          <Camera 
            style = {styles.camera}
            type={Camera.Constants.Type.front}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
                      mode: FaceDetector.FaceDetectorMode.fast,
                      detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                      runClassifications: FaceDetector.FaceDetectorClassifications.none,
                      minDetectionInterval: 100,
                      tracking: true
                      }}
            ref={(ref) => setCameraRef(ref)}
          />
          </View>
        </View>
        <View style={styles.bottom}>
          {setCaptureButton()}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300, height: 250, justifyContent: 'space-evenly' }}>
                <Text style={{paddingBottom: 10, fontWeight: 'bold', fontSize: 16}}>Enter name of the person:</Text>
                <TextInput
                  placeholder="Enter name"
                  value={faceName}
                  onChangeText={(text) => setFaceName(text)}
                  style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20, borderRadius: 15 }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                      <Text style={{color: '#dedfe0', fontSize:16,}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={uploadData}>
                      <Text style={{color: '#dedfe0', fontSize:16,}}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: color.secondary
  },
  topbar: {
    flex: 0.1
  },
  text: {
    flex: 0.1,
    justifyContent: 'center',
    paddingLeft: '5%'
  },
  bottom:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraAdj: {
    flex: 0.6,
    padding: 15,
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 5, // Adjust the width of the border
    borderRadius: 51, // Adjust the radius for the rounded border
    borderColor: color.secondary, // Adjust the color and opacity of the border
    overflow: 'hidden',
    margin: 20,
  },
  camera: {
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottombar: {
    flex: 0.1
  },
  faces: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  faceDesc: {
    fontSize: 20,
    color: 'white'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    backgroundColor: color.button,
    borderRadius: 15,
    marginBottom: 15,
    color: color.icon,
},

});

export default RegistrationScreen;