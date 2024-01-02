import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = () => {

    const navigation = useNavigation();
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome User!</Text>
            <TouchableOpacity >
                <Icon 
                    name='logout'
                    size = {22}
                    color= '#C2DFF4'
                />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#124061',
        borderBottomWidth: 1,
        borderBottomColor: '#163E5B',
        padding: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: '#C2DFF4',
        fontSize: 20, 
    },

})

export default TopBar;