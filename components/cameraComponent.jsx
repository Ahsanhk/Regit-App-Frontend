import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';

const ExpoCamera = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const { uri } = await cameraRef.current.takePictureAsync();
  //   }
  // };

  // const flipCamera = () => {
  //   setCameraType(
  //     cameraType === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back
  //   );
  // };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1, borderRadius: 15 }} 
        type={cameraType} 
        ref={cameraRef} 
        onCameraReady={() => {}}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          {Platform.OS === 'android' && (
            <View
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginBottom: 20,
              }}
            >
              {/* <TouchableOpacity onPress={flipCamera}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity> 
              <TouchableOpacity onPress={takePicture}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Picture </Text>
                </TouchableOpacity>  */}
            </View>
          )}
        </View>
      </Camera>
    </View>
  );
}

export default ExpoCamera;