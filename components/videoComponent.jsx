import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoComponent = ({ videoURL }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoURL }} // Pass the video URL here
        style={styles.videoPlayer}
        controls={true} // Show video controls (play, pause, etc.)
        resizeMode="contain" // Adjust how the video is displayed within the Video component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Set a background color for the video player
  },
  videoPlayer: {
    width: '100%',
    height: 300, // Set the desired height of the video player
  },
});

export default VideoComponent;
