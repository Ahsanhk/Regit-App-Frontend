import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedFaces, setCapturedFaces] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      await tf.setBackend('tensorflow');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    })();
  }, []);

  const captureAndRecognizeFace = async () => {
    if (!isCapturing) {
      setIsCapturing(true);
      setCapturedFaces([]); // Reset captured faces

      // Capture and process frames
      for (let i = 0; i < 3; i++) {
        const photo = await cameraRef.current.takePictureAsync();
        const uri = photo.uri;

        // Process the captured image
        const img = await faceapi.fetchImage(uri);
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0) {
          // Crop the face and convert it to an embedded vector
          const canvas = faceapi.createCanvasFromMedia(img);
          faceapi.draw.drawDetections(canvas, detections);
          const faceCanvas = faceapi.createCanvasFromMedia(img, detections[0].detection);
          const faceImageData = faceCanvas.toDataURL();

          const embedding = detections[0].descriptor;

          setCapturedFaces((prevFaces) => [...prevFaces, { image: faceImageData, embedding }]);
        }

        await FileSystem.deleteAsync(uri); // Clean up captured images
      }

      setIsCapturing(false);

      // Save the captured embeddings in local storage
      await AsyncStorage.setItem('captured_embeddings', JSON.stringify(capturedFaces));
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting Camera Permission</Text>
      ) : hasPermission === false ? (
        <Text>No Camera Access</Text>
      ) : (
        <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.front}>
          <View style={styles.facesContainer}>
            {isCapturing ? (
              <Text>Capturing...</Text>
            ) : (
              <Button title="Capture and Recognize Face" onPress={captureAndRecognizeFace} />
            )}
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

