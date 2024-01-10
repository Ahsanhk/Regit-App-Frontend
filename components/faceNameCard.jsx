import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FaceCard = () => {
  return (
    <View style={styles.faceCard}>
      <Text>Placeholder Title</Text>
      {/* You can add additional content or styling here */}
    </View>
  );
};

const styles = StyleSheet.create({
  faceCard: {
    borderWidth: 1,
    width: '90%',
    borderColor: 'gray',
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default FaceCard;
