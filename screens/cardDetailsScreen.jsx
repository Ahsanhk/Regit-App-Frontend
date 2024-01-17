import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { ToastAndroid } from "react-native";
import Toggle from "react-native-toggle-input";
import ToggleSwitch from 'toggle-switch-react-native'

import Container from "../components/background";
import { color } from "../components/color";
import { useAppContext } from "../components/authProvider";
import { ScrollView } from "react-native-gesture-handler";
import DefaultCreditCard from "../components/defaultCreditCard";
import { address } from "../components/networkAddress";
import FaceNameCard from "../components/faceName";
import TransactionCard from "../components/transactionCard";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";


const Block = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.blockContainer} onPress={onPress}>
      <Icon name={iconName} size={32} color= {color.secondary} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};


const CardDetailScreen = () => {
  const route = useRoute();
  const { cardDetails } = route.params;
  const { userData } = useAppContext();

  const navigation = useNavigation();

  const ip_address = address.ip_address;
  const card_id = cardDetails._id.$oid;
  const user_id = userData._id;
  const assignedFaces = cardDetails.assignedFaces;
  // const getCardData = cardDetails.getCardData

  const [toggleValue, setToggleValue] = useState(false);
  const [onlinePaymentValue, setOnlinePayementValue] = useState(false);
  const [intWithdrawals, setIntWithdrawals] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);
  const [faceImages, setFaceImages] = useState([]);
  const [cardFaces, setCardFaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFaces, setSelectedFaces] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [cardSettingsModalVisible, setCardSettingsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const cardSettingsModal = (visibility) => {
    setCardSettingsModalVisible(visibility);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

    // const transactionData = userTransactions.reverse();
    const slicedTransactions = userTransactions.slice(0,4);

    const fetchTransactions = async (card_id) => {
        try {
          const response = await axios.get(`http://${ip_address}/get-user-transactions/${card_id}`);
          setUserTransactions(response.data);
        } 
        catch (error) {
          console.error("Error fetching transaction history: ", error);
        }
        finally{
          setLoading(false);
        }
    };

    useEffect(() => {
      const card_id = cardDetails._id.$oid;
        fetchTransactions(card_id);
        // console.log("card details: ",cardDetails)
    },[])

  const handleSelectFace = async (faceId) => {
    const isFaceSelected = selectedFaces.some((face) => face.faceId === faceId);

    if (isFaceSelected) {
      const updatedFaces = selectedFaces.filter(
        (face) => face.faceId !== faceId,
      );
      setSelectedFaces([...updatedFaces]);
    } else {
      if (selectedFaces.length < 3) {
        setSelectedFaces([...selectedFaces, { faceId: faceId }]);
      } else {
        ToastAndroid.show("Only 3 faces can be selected", ToastAndroid.SHORT);
      }
    }
  };


  // useEffect(() => {
  //   console.log("array: ", selectedFaces);
  // }, [selectedFaces]);

  const handleUpdatePress = () => {
    setModalVisible(true);
  };

  // const [cardData, setCardData] = useState([]);
  // const getCardData = async (user_id) => {
  //   try{
  //       const response = await axios.get(`http://${ip_address}/get-cards/${user_id}`);
  //       // console.log(response.data);
  //       setCardData(response.data);
  //   }
  //   catch(error){
  //       console.error("error fetching cards data ", error)
  //   }
  // }

  const updateCardFaces = async () => {
    const updatedData = {
      card_id,
      selectedFaces,
    };
    // console.log("sending data: ", updatedData)

    try {
      const response = await axios.post(
        `http://${ip_address}/update-card-faces`,
        updatedData,
      );
      console.log("updated: ", response.data);
      setModalVisible(false);
      navigation.navigate('Home')
      // await getCardData(user_id);
      // console.log("card details: ", cardData);
      fetchCardImages();
    } catch (error) {
      console.error("error updating cards: ", error);
    }
  };

  useEffect(() => {
    const user_id = userData._id;
    if (cardDetails && cardDetails.activeStatus !== undefined) {
      setToggleValue(cardDetails.activeStatus);
      setOnlinePayementValue(cardDetails.onlineStatus);
      setIntWithdrawals(cardDetails.intStatus);
      setDefaultValue(cardDetails.default);
      fetchImages(user_id);
      fetchCardImages();
    }
  }, [cardDetails]);

  useFocusEffect(
    React.useCallback(() => {
      
    }, []),
  );


  const fetchImages = async (user_id) => {
    try {
      const response = await axios.get(
        `http://${ip_address}/get-user-faces/${user_id}`,
      );
      // console.log(response.data);

      if (Array.isArray(response.data)) {
        setFaceImages(response.data);
      } else {
        // console.log("No user face images found");
        setFaceImages([]);
      }
    } catch (error) {
      console.error("error fetching user face Images: ", error);
    }
  };

  const fetchCardImages = async () => {
    console.log(assignedFaces);
    try {
      const response = await axios.post(
        `http://${ip_address}/extract-face-names`,
        { assignedFaces },
      );
      // console.log("updated data: ", response.data.faceNames);
      setCardFaces(response.data.faceNames);
    } catch (error) {
      console.error("error fetching this card's user face Images: ", error);
    }
  };

  const toggleSwitch = async (value) => {
    const cardNumber = cardDetails.cardNumber;
    setToggleValue(value);
    try {
      const response = await axios.post(
        `http://${ip_address}/update-active-status/${cardNumber}`,
      );
      // console.log(response.data)
    } catch (error) {
      console.error("error setting card activve status ", error);
    }
  };

  const toggleOnlinePayment = async (value) => {
    const cardNumber = cardDetails.cardNumber;
    setOnlinePayementValue(value);
    try {
      const response = await axios.post(
        `http://${ip_address}/update-online-Status/${cardNumber}`,
      );
      // console.log(response.data)
    } catch (error) {
      console.error("error setting online payment status ", error);
    }
  };

  const toggleIntWithdrawals = async (value) => {
    const cardNumber = cardDetails.cardNumber;
    setIntWithdrawals(value);
    try {
      const response = await axios.post(
        `http://${ip_address}/update-international-status/${cardNumber}`,
      );
      // console.log(response.data);
    } catch (error) {
      console.error("error setting online payment status ", error);
    }
  };

  const toggleDefault = async (value) => {
    const cardNumber = cardDetails.cardNumber;
    const user_id = userData._id;
    setDefaultValue(value);

    try {
      const response = await axios.post(
        `http://${ip_address}/set-default-card?user_id=${user_id}&cardNumber=${cardNumber}`,
      );
      // console.log(response.data);
    } catch (error) {
      console.error("error setting default payment status ", error);
    }
  };

  const deleteCard = async () => {
    try {
      const response = await axios.delete(
        `http://${ip_address}/delete-card/${card_id}`,
      );
      // console.log(response.data.message)
      ToastAndroid.show("Card Deleted", ToastAndroid.SHORT);
      navigation.navigate("Home");
    } catch (error) {
      console.error("error deleting the card: ", error);
    }
  };


  const renderFace = () => {
    if (cardFaces.length === 0) {
      return(
        <View style={{height: responsiveHeight(20),justifyContent:'center', alignItems: 'center'}}>
          <Text style={{fontSize: responsiveFontSize(2.5),}}>No faces added yet :(</Text>
        </View>
      )
    } 
    else {
      return (
        <View>
          {cardFaces.map((cardFaces, index) => (
            <FaceNameCard
              key={cardFaces}
              faceName={cardFaces}
              // face_id={face._id}
              // fetchImages={fetchImages}
            />
          ))}
        </View>
      );
    }
  };

  function transactionRender() {
    if (loading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    } else if (!userTransactions || userTransactions.length === 0) {
      return (
            <View style={{height: responsiveHeight(20),justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18,}}>No transaction activity :(</Text>
            </View>
      );
    } else {
      return (
        <View>
          {slicedTransactions.map((slicedTransactions) => (
            <TransactionCard
              key={slicedTransactions.time}
              userTransactions={slicedTransactions}
            />
          ))}
        </View>
      );
    }
  }

  const renderFaceCards = () => {
    if (faceImages.length === 0) {
      return <Text>No faces</Text>;
    } else {
      return (
        <View>
          {faceImages.map((face, index) => (
              <TouchableOpacity
                  key={face._id}
                  onPress={() => handleSelectFace(face._id)}
                  style={[
                      styles.faceCard,
                      selectedFaces.some((faceObj) => faceObj.faceId === face._id) &&
                          styles.selectedFace,
                  ]}
              >
                  <Text style={styles.faceName}>{face.faceName}</Text>
              </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-back-ios" size={20} color="#dedfe0" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#dedfe0",
            fontSize: 20,
            paddingLeft: "25%",
          }}
        >
          Card Details
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.creditCardContainer}>
          <DefaultCreditCard
            bankName={cardDetails.bankName}
            cardNumber={cardDetails.cardNumber}
            issuedate={cardDetails.issuedate}
            balance={cardDetails.balance}
          />
        </View>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10, marginTop: '2%'}}>
          <Block
            iconName="face-retouching-natural"
            title="Manage Faces"
            onPress={handleUpdatePress}
          />
          <Block
            iconName="person"
            title="Visit Profile"
            onPress={() => navigateToScreen('User')}
          />
          <Block
            iconName="settings"
            title="Card Settings"
            onPress={() => cardSettingsModal(true)}
          />
        </View>
        
        <View style={styles.containerBody}>
            <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>Transaction Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate("History", {userTransactions: userTransactions})}>
                <Text style={{paddingRight: 10, color: 'blue', fontSize:16}}>See all</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.transactionContainer}>
            {transactionRender()}
        </View>

        <View style={styles.containerBody}>
            <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>Registered Faces</Text>
                
            <TouchableOpacity onPress={handleUpdatePress}>
                <Text style={{paddingRight: 10, color: 'blue', fontSize:16}}>Update</Text>
            </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', paddingBottom: 5}}>Choose faces(max 3)</Text>
                    <ScrollView
                      style={styles.nameBox}
                      showsVerticalScrollIndicator={false}
                    >
                      {renderFaceCards()}
                    </ScrollView>
                    <View style={styles.options}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                          setSelectedFaces([]);
                        }}
                      >
                        <Text style={{fontSize: 16, color: '#2a21d1'}}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={updateCardFaces}>
                        <Text style={{fontSize: 16, color: '#2a21d1',}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
        </View>
        <View style={styles.faceContainer}>
            {renderFace()}
        </View>

        {/* <View style={styles.cardSettingsContainer}> */}
        <Modal
          visible={cardSettingsModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalContentSettings}>
              <Text
                style={{padding: 5, fontSize: 18, fontWeight: 'bold'}}
              >
                Card Settings
              </Text>
              <View style={{width: '95%',marginLeft:'2.5%',backgroundColor: '#f5f5f5', padding: 5, borderRadius: 18 }}>
                <View style={styles.cardOption}>
                  <Text>ATM Withdraws</Text>
                  <ToggleSwitch
                    isOn={toggleValue}
                    onColor="#81b0ff"
                    offColor="#767577"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={toggleSwitch}
                  />
                </View>
                <View style={styles.cardOption}>
                  <Text>Online Payment</Text>
                  <ToggleSwitch
                    isOn={onlinePaymentValue}
                    onColor="#81b0ff"
                    offColor="#767577"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={toggleOnlinePayment}
                  />
                </View>
                <View style={styles.cardOption}>
                  <Text>International Usage</Text>
                  <ToggleSwitch
                    isOn={intWithdrawals}
                    onColor="#81b0ff"
                    offColor="#767577"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={toggleIntWithdrawals}
                  />
                </View>
                <View style={styles.cardOption}>
                  <Text>Default Card</Text>
                  <ToggleSwitch
                    isOn={defaultValue}
                    onColor="#81b0ff"
                    offColor="#767577"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={toggleDefault}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => cardSettingsModal(false)} style={{}}>
                  <Text style={{ marginTop: 15, color: 'blue', marginLeft: '80%', fontSize: 18 }}>Close</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
        {/* </View> */}
        

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => deleteCard()}>
            <Text style={{ color: "#dedfe0", fontSize: 18 }}>Delete Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.04,
    flexDirection: "row",
    backgroundColor: color.secondary,
    padding: 20,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 0.95,
    padding: 10,
  },
  creditCardContainer: {
    flex: 0.4,
    height: responsiveHeight(26),
    paddingTop: 10,
    justifyContent: "center",
  },
  cardSettingsContainer: {
    flex: 0.6,
    padding: 20,
    height: "100%",
    width: "100%",
  },
  input: {
    backgroundColor: color.input,
    width: "85%",
    color: color.text,
    padding: 18,
    borderRadius: 15,
    marginTop: 30,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: responsiveHeight(7),
    width: "60%",
    backgroundColor: "#c43543",
    padding: 10,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 50,
  },
  faceContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    width: '95%',
    marginLeft: '2.5%',
    // marginBottom: '1%'
  },
  icon: {
    paddingTop: 10,
  },
  text: {
    color: 'blue',
    padding: 10,
  },
  nameBox: {
    padding: 10,
    height: responsiveHeight(27),
  },
  options: {
    paddingTop:10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    // maxHeight: '80%',
    // overflow: 'scroll',
  },
  modalContentSettings: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
  faceCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    margin: 5,
    borderRadius: 8,
  },
  faceName: {
    fontSize: 16
  },
  selectedFace: {
    borderColor: "blue",
  },
  cardOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  transactionContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    width: '95%',
    marginLeft: '2.5%'
},
containerBody: {
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  marginTop:responsiveHeight(1),
},
  blockContainer: {
    borderRadius: 10,
    alignItems: 'center',
    height: responsiveHeight(12),
    width: responsiveHeight(13),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  title: {
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(1),
    textAlign: 'center',
  },
});

export default CardDetailScreen;
