import React, { useState, useEffect } from 'react';
// import { Camera, CameraKitCamera, CameraKitFace } from 'react-native-camera-kit';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import axios from 'axios';

const CameraKit = () => {
  


  return (
    <View>
        <Camera
            // other props
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
            }}
        />





{/* 

      {/* Render the camera view
      {/* <CameraKitCamera /> */}

      {/* Render the face bounding box */}
      {face && (
        <View
          style={{
            position: 'absolute',
            top: face.origin.y,
            left: face.origin.x,
            width: face.size.width,
            height: face.size.height,
            borderWidth: 2,
            borderColor: 'red',
          }}
        />
      )}

      {/* Display the face visibility percentage */}
      <Text>Face visibility percentage: {faceVisibilityPercentage}%</Text>

      {/* Render a button to capture the image */}
      <Button title="Capture Image" onPress={captureImage} />

      {/* Display the captured image */}
      {capturedImage && (
        <Image
          source={{ uri: capturedImage.uri }}
          style={{ width: 200, height: 200 }}
        />
      )} */} */}
    </View>
  );
};

export default CameraKit;