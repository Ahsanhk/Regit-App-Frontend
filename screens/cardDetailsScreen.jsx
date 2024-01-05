import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
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
import CreditCard from "../components/creditCard";
import BalanceCard from "../components/balanceCard";
import { ScrollView } from "react-native-gesture-handler";
import DefaultCreditCard from "../components/defaultCreditCard";
import { address } from "../components/networkAddress";
import FaceNameCard from "../components/faceName";

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
      // console.log(cardDetails);
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
      // fetchCardImages();
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
        console.error("No user face images found");
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
      console.log("updated data: ", response.data.faceNames);
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
      return <Text style={{ color: "white", fontSize: 18 }}>No faces</Text>;
    } else {
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
              <FaceNameCard
                key={face.faceName}
                faceName={face.faceName}
                face_id={face._id}
                fetchImages={fetchImages}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Icon name="arrow-back-ios" size={20} color="#dedfe0" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#dedfe0",
            fontSize: 20,
            paddingLeft: "25%",
          }}
        >
          My Cards
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.balanceCardContainer}>
          <BalanceCard balance={cardDetails.balance} />
        </View>
        <View style={styles.creditCardContainer}>
          <DefaultCreditCard
            bankName={cardDetails.bankName}
            cardNumber={cardDetails.cardNumber}
            updatedIssueDate={cardDetails.issueDate}
          />
        </View>

        <View style={styles.cardSettingsContainer}>
          <Text
            style={{
              color: color.text,
              fontSize: 20,
              paddingBottom: 10,
              fontWeight: "bold",
            }}
          >
            Card Settings
          </Text>
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
        <View style={styles.faceContainer}>
          <View style={styles.cardTop}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.icon}
            >
              <Icon name="add" size={24} color={"white"} />
            </TouchableOpacity>
            <Text style={styles.text}>Add Face</Text>
            <TouchableOpacity onPress={handleUpdatePress}>
              <Text style={styles.text}>Update</Text>
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
                  <ScrollView
                    style={styles.nameBox}
                    showsVerticalScrollIndicator={false}
                  >
                    {renderFaceCards()}
                  </ScrollView>

                  <TouchableOpacity onPress={updateCardFaces}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setSelectedFaces([]);
                    }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.cardBottom}>
            <ScrollView
              style={styles.nameBox}
              showsVerticalScrollIndicator={false}
            >
              {renderFace()}
            </ScrollView>
          </View>
        </View>

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
  balanceCardContainer: {
    flex: 0.1,
    paddingTop: 10,
  },
  creditCardContainer: {
    flex: 0.4,
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
    // height: '25%',
    width: "60%",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 50,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  faceContainer: {
    flex: 0.1,
    height: 250,
    width: "100%",
    backgroundColor: color.secondary,
    borderRadius: 18,
    padding: 10,
    overflow: "scroll",
  },
  icon: {
    paddingTop: 10,
  },
  text: {
    color: color.icon,
    padding: 10,
  },
  cardTop: {
    height: "100%",
    flex: 2,
    flexDirection: "row",
    alignContent: "center",
    // backgroundColor:'blue',
  },
  cardBottom: {
    flex: 8,
    backgroundColor: color.box,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  nameBox: {
    paddingLeft: "4%",
    paddingTop: "5%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    // maxHeight: '80%',
    // overflow: 'scroll',
  },
  faceCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 5,
    borderRadius: 8,
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
  toggle: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  switchTrack: {
    borderRadius: 15,
    backgroundColor: '#A9A9A9',
  },
  switchThumb: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#A9A9A9',
  },
});

export default CardDetailScreen;
