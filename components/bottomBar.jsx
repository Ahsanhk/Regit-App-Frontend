import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from './color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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

                
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Cards')}>
                    <Icon name='credit-card' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Cards</Text>
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
                            <TouchableOpacity style={styles.additionalIcon} 
                            onPress={() => {
                                navigation.navigate('Card-Register') 
                                toggleOptions()
                                } }>
                                <View style={styles.iconContainer}>
                                    <CommunityIcon name='credit-card-plus' size={28} color="white" />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.additionalIcon, { transform: [{ translateX: rightIconTranslate }] }]}>
                            <TouchableOpacity style={styles.additionalIcon} 
                            onPress={() => {
                                navigation.navigate('Register')
                                toggleOptions()
                                }}>
                                <View style={styles.iconContainer}>
                                    <CommunityIcon name='face-recognition' size={28} color="white" />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                )}

                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Faces')}>
                    <Icon name='face' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Faces</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('User')}>
                    <Icon name='person' size={24} color={color.icon} />
                    <Text style={styles.iconText}>Profile</Text>
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
        justifyContent:'space-around',
        alignItems: 'center',
    },
    text: {
        color: color.text,
        fontSize: 18,
    },
    icons: {
        alignItems: 'center',
        // justifyContent: 'center',
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
        width: responsiveWidth(18),
        height: responsiveHeight(9),
        borderRadius: 300,
        // marginRight: 10,
        backgroundColor: "#439ae0",
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
        backgroundColor: '#439ae0', 
        width: responsiveWidth(12),
        height: responsiveHeight(6),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 8, 
      },
});

export default BottomBar;
