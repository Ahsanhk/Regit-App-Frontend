import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const SettingsModal = ({ isVisible, onClose, option, onSubmit }) => {
  const [rating, setRating] = useState(0);

  if (!isVisible || !option) {
    return null; // Don't render anything if the modal is not visible or option is null
  }

  const handleStarRating = (rating) => {
    setRating(rating);
  };

  const handleOptionSubmit = () => {
    // Handle submit logic based on the selected option
    onSubmit(option, rating);
    onClose();
  };

  return (
    <View>
    <Modal isVisible={isVisible} onBackdropPress={onClose} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        {option ? (
          <>
            <Text style={styles.modalTitle}>{option.name}</Text>

            {option.id === '3' && (
              <View style={styles.starRatingContainer}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  selectedStar={(rating) => handleStarRating(rating)}
                  fullStarColor="#FFD700"
                />
              </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleOptionSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.modalTitle}>Invalid Option</Text>
        )}
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        top: '50%',
        left: '40%',
        transform: [{ translateX: -50 }, { translateY: -100 }],
      },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  starRatingContainer: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsModal;
