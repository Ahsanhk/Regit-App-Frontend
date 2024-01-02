import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const DropMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleRename = () => {
    // Handle the "Rename" option here
    // You can implement the logic to rename the item.
    // For example, show a text input for renaming.
    toggleMenu();
  };

  const handleDelete = () => {
    // Handle the "Delete" option here
    // You can implement the logic to delete the item.
    toggleMenu();
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseMenu}>
      <View style={styles.fullScreenContainer}>
        <View style={styles.container}>
          <TouchableOpacity style= {{ width: '100%', alignItems: 'center'}} onPress={toggleMenu}>
            <Text style={{fontSize: 24, color: 'white'}}>⋮</Text>
            {/* <Icon 
                name = 'dots-three-vertical'
                size = {18}
            /> */}
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={isMenuVisible}
            onRequestClose={toggleMenu}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={handleRename}>
                <Text>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseMenu}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    // backgroundColor: 'white',
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  modalContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 530, // Adjust the distance from the three dots
    right: 65,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
  },
  text: {
    fontSize: 18
  },
});

export default DropMenu;