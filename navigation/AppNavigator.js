import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/loginScreen";
import HomeScreen from "../screens/homeScreen";
import RegistrationScreen from "../screens/registrationScreen";
import CongratsScreen from "../screens/congratScreen";
import TestScreen from "../screens/testScreen";
import UserRegisterationScreen from "../screens/userRegisterationScreen";
import AccountRegisterationScreen from "../screens/accountRegisterationScreen";
import Container from "../components/background";
import ProfileScreen from "../screens/testScreen";
import SettingScreen from "../screens/settingScreen";
import HistoryScreen from "../screens/historyScreen";
import CardRegistrationScreen from "../screens/cardRegisterScreen";
import OtpScreen from "../screens/otpScreen";
import MobilePhoneEnter from "../screens/mobileNumberScreen";
import UserScreen from "../screens/userScreen";
import CardDetailScreen from "../screens/cardDetailsScreen";
import CardScreen from "../screens/cardScreen";
import FaceScreen from "../screens/faceScreen";
import PrivacyPolicyScreen from "../screens/privacyPolicyScreen";
import TermsAndConditionsScreen from "../screens/termsConditions";
import SmsScreen from "../components/smsScreen";

const Stack = createStackNavigator();
const tab = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
                <Stack.Screen name="Congrats" component={CongratsScreen} />
                <Stack.Screen name="SignUp" component={UserRegisterationScreen} />
                <Stack.Screen name="Account-Info" component={AccountRegisterationScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Settings" component={SettingScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="Cards" component={CardScreen} />
                <Stack.Screen name="Card-Register" component={CardRegistrationScreen} />
                <Stack.Screen name="OTP" component={OtpScreen} />
                <Stack.Screen name="MobilePhone" component={MobilePhoneEnter} />
                <Stack.Screen name="User" component={UserScreen} />
                <Stack.Screen name="Card-Details" component={CardDetailScreen} />
                <Stack.Screen name="Faces" component={FaceScreen} />
                <Stack.Screen name="Privacy-Policy" component={PrivacyPolicyScreen} />
                <Stack.Screen name="Terms-Conditions" component={TermsAndConditionsScreen} />
                <Stack.Screen name="Sms" component={SmsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;