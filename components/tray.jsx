import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const TrayModal = ({ isVisible, onClose, onOption1Press, onOption2Press }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
    >
      <View style={styles.tray}>
        <TouchableOpacity onPress={onOption1Press}>
          <Text>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOption2Press}>
          <Text>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  tray: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default TrayModal;
