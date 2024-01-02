import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, Image, TextInput, ToastAndroid, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Container from '../components/background';
import { color } from '../components/color';
import TransactionCard from '../components/transactionCard';
import { useAppContext } from '../components/authProvider';
import { ScrollView } from 'react-native-gesture-handler';
// import { Calendar } from 'react-native-calendars';

import axios from 'axios';

const HistoryScreen = () => {
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const { userData} = useAppContext();
    const [userTransactions, setUserTransactions] = useState([]);

    const navigation = useNavigation();

    const fetchTransactions = async (username) => {
        try {
          const fetchUserTransactions = await axios.get(`http://192.168.50.75:8000/get-user-transactions/${username}`);
          setUserTransactions(fetchUserTransactions.data.transaction);
        } catch (error) {
          console.error("Error fetching transaction history: ", error);
        }
    };

    useEffect(() => {
        const username = userData.username;
        fetchTransactions(username);
    },[])

    const handleLinkPress = async (videoURL) => {
        try {
          if (videoURL && typeof videoURL === 'string') {
            const supported = await Linking.canOpenURL(videoURL);
            if (supported) {
              await Linking.openURL(videoURL);
            } else {
              console.log("Can't open URL: ", videoURL);
            }
          } else {
            console.log('Invalid URL');
          }
        } catch (error) {
          console.error('Failed to open URL: ', error);
        }
      };
    

    return(
        <Container>
            
            <View style = {styles.header}>
                <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                    <Icon
                        name = 'chevron-left'
                        color = 'white'
                        size = {28}
                    />
                </TouchableOpacity>
                <Text style= {{color: 'white', fontSize: 20}}>
                    Transaction History
                </Text>
                <Icon 
                    name = 'settings'
                    size = {24}
                    color = {color.secondary}
                />
            </View>
            <ScrollView>
            {userTransactions.map((userTransactions) => (
                <TransactionCard
                    key={userTransactions.time}
                    userTransactions={userTransactions}
                    onLinkPress={handleLinkPress}
                />
            ))}
            </ScrollView>
        </Container>
    )
}


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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    
    videoLink: {
        color: '#007AFF',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
})


export default HistoryScreen;


// const [fromDate, setFromDate] = useState('');
    // const [toDate, setToDate] = useState('');
    // const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    // const [showToDatePicker, setShowToDatePicker] = useState(false);

    // const handleDateChange = (selectedDate, type) => {
    //     if (type === 'from') {
    //         setFromDate(selectedDate);
    //         setShowFromDatePicker(false);
    //     } else if (type === 'to') {
    //         setToDate(selectedDate);
    //         setShowToDatePicker(false);
    //     }
    // };



// <View style={styles.container}>
//                 <View style={styles.datePickerContainer}>
//                     <Text>FROM:</Text>
//                     <TouchableOpacity >
//                         <Text>date</Text>
//                     </TouchableOpacity>
//                     {/* {showFromDatePicker && ( */}
//                         <DatePicker
//                             // value={fromDate}
//                             mode="date"
//                             display="default"
//                             // onChange={(event, selectedDate) => handleDateChange(selectedDate, 'from')}
//                         />
//                     {/* )} */}
//                 </View>
//                 <View style={styles.datePickerContainer}>
//                     <Text>TO:</Text>
//                     <TouchableOpacity >
//                         <Text>date</Text>
//                     </TouchableOpacity>
//                     {/* {showToDatePicker && ( */}
//                         <DatePicker
//                             // value={toDate}
//                             mode="date"
//                             display="default"
//                             // onChange={(event, selectedDate) => handleDateChange(selectedDate, 'to')}
//                         />
//                     {/* )} */}
//                 </View>
//                 <TouchableOpacity style={styles.sortButton}>
//                     <Text style={styles.sortButtonText}>Sort</Text>
//                 </TouchableOpacity>
//             </View>