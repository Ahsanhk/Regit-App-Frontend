import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import FaceCard from './faceNameCard';

const FacesContainer = () => {
  // Sample data of faces (face IDs or keys)
  const faces = [1, 2, 3, 4, 5]; // Replace this with your face data

  return (
    <View style={styles.facesContainer}>
      <Text style={styles.heading}>Registered Faces</Text>
      <FlatList
        data={faces}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <FaceCard key={item} />}
        numColumns={2} // Adjust as per your design
      />
    </View>
  );
};

const styles = StyleSheet.create({
  facesContainer: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default FacesContainer;
