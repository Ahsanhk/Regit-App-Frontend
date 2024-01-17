import React, { useState } from 'react';
import { Modal, TouchableOpacity,StyleSheet, View, Text, TextInput, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropMenu from './dropMenu';
import { color } from './color';
import axios from 'axios';
import { useAppContext } from './authProvider';
import { useNavigation } from '@react-navigation/native';
import { address } from './networkAddress';

const FaceNameCard = ({faceName, face_id, fetchImages}) => { 
    const [isTrayVisible, setIsTrayVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const ip_address = address.ip_address;
    
    const { userData} = useAppContext();

    const user_id = userData._id;

    const toggleTrayVisibility = () => {
        setIsTrayVisible(!isTrayVisible);
      };
    
      const deleteItem = async () => {
        setIsDeleteModalVisible(true);
      };

      const handleDeleteConfirm = async () => {
        try {
          const response = await axios.post(`http://${ip_address}/delete-face-name`, { face_id });
          fetchImages(user_id);
          setIsDeleteModalVisible(false);
          ToastAndroid.show('Face deleted successfully', ToastAndroid.SHORT);
        } catch (error) {
          console.error("Error deleting face: ", error);
        }
      };

      const renameItem = async () => {
        const updatedData = {
          face_id,
          updatedName,
        };

        try{
          const response = await axios.post(`http://${ip_address}/update-face-name`, updatedData);
          // console.log(response.data);
          fetchImages(user_id);
          setIsModalVisible(false);
          toggleTrayVisibility();

          ToastAndroid.show('label renamed successfully', ToastAndroid.SHORT)
          
        }
        catch(error){
          console.error("error renaming: ", error)
        }
      };

      const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
      };


    return(
    <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ color: 'black', fontSize: 16 }}>
            {faceName}
          </Text>
        </View>
        
          {!isTrayVisible && (
            <TouchableOpacity onPress={toggleTrayVisibility}>
                <Icon name="chevron-left" size={24} color={color.secondary} />
            </TouchableOpacity>
            )}
        
        <View style={{alignContent: 'flex-end'}}>
        {isTrayVisible && (
          <View style={styles.tray}>
            <TouchableOpacity onPress={deleteItem}>
              <View style={styles.trayOption}>
                <Icon name="delete" size={24} color="red" />
                {/* <Text>Delete</Text> */}
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <View style={styles.trayOption}>
                <Icon name="square-edit-outline" size={24} color= {color.secondary} />
                {/* <Text>Rename</Text> */}
              </View>
            </TouchableOpacity>

            <Modal 
              visible={isModalVisible} 
              transparent={true} 
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: '5%'}}>Enter Updated Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setUpdatedName(text)}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',padding: 10, }}>
                    <TouchableOpacity style={{}} onPress={() => setIsModalVisible(false)}>
                        <Text style={{color: 'blue', fontSize:16,}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={renameItem}>
                        <Text style={{color: 'blue', fontSize:16,}}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
            visible={isDeleteModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalDeleteContent}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '15%', }}>
                  Are you sure you want to delete this face?
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderTopColor: 'lightgray', borderTopWidth:1 }}>
                  <TouchableOpacity style={{}} onPress={handleDeleteCancel}>
                    <Text style={{ color: 'blue', fontSize: 18 }}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{}} onPress={handleDeleteConfirm}>
                    <Text style={{ color: 'blue', fontSize: 18 }}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
  
            <TouchableOpacity onPress={toggleTrayVisibility}>
              <View style={styles.trayOption}>
                <Icon name="cancel" size={24} color={color.secondary} />
                {/* <Text>Cancel</Text> */}
              </View>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding:10,
        height:55,
        borderRadius:8,
        borderColor:'lightgray',
        borderWidth:1,
        marginBottom: 5,
        overflow: 'hidden',
    },
    textContainer: {
        flex: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'blue'
    },
    option: {
        width: '10%',
        paddingLeft: '80%',
        alignItems: 'center',
    },
    tray: {
        display: 'flex',
        flexDirection: 'row',
        // marginRight: 25
    },
    trayOption: {
        paddingRight: 15
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 300,
    },
    modalContent: {
      height: 200,
      backgroundColor: '#f5f5f5',
      padding: 20,
      borderRadius: 10,
      width: '90%',
    },
    input: {
      height: 50,
      // width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      // paddingHorizontal: 10,
      borderRadius: 15
    },
    modalDeleteContent: {
      height: 150,
      backgroundColor: '#f5f5f5',
      padding: 20,
      borderRadius: 10,
      width: '70%',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 100,
      backgroundColor: color.button,
      borderRadius: 15,
      marginBottom: 15,
      color: color.icon,
  },
})

export default FaceNameCard;