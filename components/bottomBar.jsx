import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from './color';

const BottomBar = () => {
    const navigation = useNavigation();
    const [showOptions, setShowOptions] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const toggleOptions = () => {
        setShowOptions(!showOptions);
        Animated.spring(animation, {
            toValue: showOptions ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };

    const leftIconTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -40],
    });

    const rightIconTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 40],
    });

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Home')}>
                    <Icon name='home' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Home</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('History')}>
                    <Icon name='history' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Transactions</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.centerIcon} onPress={toggleOptions}>
                    <Animated.View
                        style={[
                            styles.circle,
                            {
                                transform: [
                                    {
                                        scale: animation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.3],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Icon name='add' size={38} color="white" />
                    </Animated.View>
                </TouchableOpacity>

                {showOptions && (
                    <View style={styles.additionalIcons}>
                        
                        <Animated.View style={[styles.additionalIcon, { transform: [{ translateX: leftIconTranslate }] }]}>
                            <TouchableOpacity style={styles.additionalIcon} onPress={() => navigation.navigate('Card-Register')}>
                                <View style={styles.iconContainer}>
                                    <Icon name='credit-card' size={28} color="white" />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.additionalIcon, { transform: [{ translateX: rightIconTranslate }] }]}>
                        <TouchableOpacity style={styles.additionalIcon} onPress={() => navigation.navigate('Register')}>
                            <View style={styles.iconContainer}>
                                <Icon name='face' size={28} color="white" />
                            </View>
                        </TouchableOpacity>
                        </Animated.View>
                    </View>
                )}

                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('User')}>
                    <Icon name='person' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Settings')}>
                    <Icon name='settings' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: color.secondary,
    },
    body: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
    },
    text: {
        color: color.text,
        fontSize: 18,
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerIcon: {
        justifyContent: 'center',
        marginBottom: 30
    },
    iconText: {
        color: color.icon,
        fontSize: 12,
    },
    circle: {
        width: 65,
        height: 65,
        borderRadius: 300,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    additionalIcons: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: -70, 
        left: 0,
        right: -20,
    },
    additionalIcon: {
        marginHorizontal: 15,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: '#FF6347', 
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 8, 
      },
});

export default BottomBar;
