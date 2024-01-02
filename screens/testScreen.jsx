import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/background';
import { ScrollView } from 'react-native-gesture-handler';
import BottomBar from '../components/bottomBar';
import { color } from '../components/color';
// import { Button } from 'react-native-paper';


const ProfileScreen = () => {
    return(
        <Container style={styles.container}>
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
              color = 'white'
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
              <View style = {styles.textOutput}> 
                <Text style = {{fontSize: 18, }}>John Doe</Text>
              </View>
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
          <View style = {{flex: 0.125}}>
            <BottomBar />
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
    // backgroundColor: 'white'
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




// const captureImage = async () => {
  //   if (cameraRef) {
  //     try {
  //       const photo = await cameraRef.takePictureAsync({ quality: 1 });
        
  //       const formData = new FormData();
  //       formData.append('image', {
  //         uri: photo.uri,
  //         type: 'image/jpeg',
  //         name: 'photo.jpg',
  //       });

  //       const response = await axios.post('http://192.168.50.75:8000/handleImage', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       console.log('Image upload response:', response.data);
  //     } catch (error) {
  //       console.error('Error capturing and uploading image:', error);
  //     }
  //   }
  // };

  // const captureImageJson = () => {
  //   ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       // Convert the image to base64
  //       const imageBase64 = `data:${response.type};base64,${response.data}`;

  //       // Create a JSON object with the image data
  //       const imageJson = {
  //         image: imageBase64,
  //         description: 'A sample image',
  //         timestamp: new Date().toJSON(),
  //       };

  //       // Send the JSON object to the backend
  //       axios.post('https://192.168.50.75:8000/upload-image', imageJson)
  //         .then((response) => {
  //           console.log('Image uploaded successfully.');
  //         })
  //         .catch((error) => {
  //           console.error('Image upload failed:', error);
  //         });
  //     }
  //   });
  // };


// <View >
        // <Camera 
        //     type={Camera.Constants.Type.front}
        //     style={styles.camera}
        //     onFacesDetected={handleFacesDetected}
        //     faceDetectorSettings={{
        //         mode: FaceDetector.FaceDetectorMode.fast,
        //         detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        //         runClassifications: FaceDetector.FaceDetectorClassifications.none,
        //         minDetectionInterval: 100,
        //         tracking: true
        //         }}>
        //     {getFaceDataView()}
        //     <View >
        //       <Icon 
        //         name= 'camera'
        //         size = {24}
        //         color = 'white' 
        //       />
        //     </View>
        // </Camera>
        // {/* <View style ={styles.bottom}>
          // {captureImage()}
        // </View> */}
    //  </View> 







    // function getFaceDataView() {
    //   if (faceData.length === 0) {
    //     return (
    //       <View style={styles.faces}>
    //         <Text style={styles.faceDesc}>No faces </Text>
    //       </View>
    //     );
    //   } 
    //   else{
    //       return(
    //           <View style={styles.faces}>
    //               <Text style = {styles.faceDesc}>Face detected</Text>
  
    //           </View>
    //       )
    //   }
    //   // else {
    //   //   return faceData.map((face, index) => {
    //   //     const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
    //   //     const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
    //   //     const smiling = face.smilingProbability > 0.7;
    //   //     return (
    //   //       <View style={styles.faces} key={index}>
    //   //         <Text style={styles.faceDesc}>Eyes Shut: {eyesShut.toString()}</Text>
    //   //         <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
    //   //         <Text style={styles.faceDesc}>Smiling: {smiling.toString()}</Text>
    //   //       </View>
    //   //     );
    //   //   });
    //   // }
    // }





    // function getFaceDataView() {
      //   if (faceData.length > 0) {
      //     // If faces are detected, render information about each detected face
      //     return (
      //       <View style={styles.faces}>
      //         {/* {faceData.map((face, index) => (
      //         <View key={index} style={styles.faceContainer}>
      //           <Text style={styles.faceDesc}>Face {index + 1} Detected:</Text>
      //           <Text style={styles.faceDesc}>Position: (left: {face.bounds.origin.x}, top: {face.bounds.origin.y})</Text>
      //           <Text style={styles.faceDesc}>Size: (width: {face.bounds.size.width}, height: {face.bounds.size.height})</Text>
      //           <View
      //             style={{
      //               position: 'absolute',
      //               left: face.bounds.origin.x,
      //               top: face.bounds.origin.y,
      //               width: face.bounds.size.width,
      //               height: face.bounds.size.height,
      //               borderWidth: 2, // Border width for the bounding box
      //               borderColor: 'red', // Border color for the bounding box
      //             }}
      //           />
      //         </View>
      //       ))} */}
      //       </View>
      //     );
      //   } else {
      //     return (
      //       <View style={styles.faces}>
      //         <Text style={styles.faceDesc}>No faces</Text>
      //       </View>
      //     );
      //   }
      // }


      // const showAndHideToast = () => {
  //   toastRef.current.show({
  //     type: 'success',
  //     text1: 'Hello',
  //     text2: 'This toast will hide after 2 seconds',
  //     visibilityTime: 2000,
  //   });
  // };