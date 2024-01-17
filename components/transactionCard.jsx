import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { color } from './color';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const TransactionCard = ({userTransactions, onLinkPress}) => {

    function renderCard(){
        if(userTransactions.status == true){
            return (
                <View style={styles.transactionContainer}>
                  <View style={styles.iconContainer}>
                    <Icon name="account-balance-wallet" size={responsiveHeight(3.3)} color="#007AFF" />
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{userTransactions.amount}</Text>
                    <Text style={styles.date}></Text>
                    <Text style={styles.name}>{userTransactions.time}</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <AntIcon 
                        name = "checkcircle"
                        size = {responsiveHeight(3.3)}
                        color = "green"
                    />
                    <TouchableOpacity onPress={() => onLinkPress(userTransactions.videoURL)}>
                        <Text style={styles.amount}>Watch Video</Text>
                    </TouchableOpacity>
                      {/* <Text style={styles.videoLink}>Watch Video</Text> */}
                    
                  </View>
                </View>
              );
        }
        else{
            return (
                <View style={styles.transactionContainerFalse}>
                  <View style={styles.iconContainer}>
                    <Icon name="account-balance-wallet" size={24} color="#007AFF" />
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{userTransactions.amount}</Text>
                    <Text style={styles.date}></Text>
                    <Text style={styles.name}>{userTransactions.time}</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <AntIcon 
                        name = "exclamationcircle"
                        size = {24}
                        color = "red"
                    />
                    <TouchableOpacity onPress={() => onLinkPress(userTransactions.videoURL)}>
                        <Text style={styles.amount}>Watch Video</Text>
                    </TouchableOpacity>
                      {/* <Text style={styles.videoLink}>Watch Video</Text> */}
                    
                  </View>
                </View>
              );
        }
    }
  return (
    <View>
        {renderCard()}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginBottom: 16,
    },

    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sortButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    sortButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: color.secondary,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
    body: {
        // flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortContainer:{},
    dateContainer:{
        flexDirection: 'row'
    },
    transactionContainer: {
        // backgroundColor: '#dbe8d8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginLeft: 10,
        marginRight:10,
    },
    transactionContainerFalse: {
        // backgroundColor: '#fadedf',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginLeft: 10,
        marginRight:10,
        // backgroundColor:'yellow'
    },
    iconContainer: {
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
    },
    date: {
        fontSize: responsiveFontSize(1.8),
        color: '#888',
    },
    amount: {
        fontSize: responsiveFontSize(1.9),
        // fontWeight: 'bold',
        color: '#007AFF',
        textDecorationLine: 'underline',    
    },
    
    videoLink: {
        color: color.primary,
        textDecorationLine: 'underline',
        marginTop: 10,
    },
})
export default TransactionCard;
