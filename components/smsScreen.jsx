import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import Sms from 'react-native-sms';

const SmsScreen = () => {
  const [randomNumber, setRandomNumber] = useState('');

  const generateRandomNumber = () => {
    // Generate a random 4-digit number
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setRandomNumber(randomCode.toString());
  };

  const sendSMS = () => {
    generateRandomNumber();
    const recipient = '+923314347162';

    if (!randomNumber) {
      Alert.alert('Generate Code', 'Please generate a code first.');
      return;
    }

    Sms.send(
      [recipient],
      `Your verification code is: ${randomNumber}`,
      (completed, canceled, error) => {
        if (completed) {
          Alert.alert('SMS Sent', 'Verification code sent successfully.');
        } else if (canceled) {
          Alert.alert('SMS Canceled', 'SMS sending canceled.');
        } else if (error) {
          Alert.alert('Error', `Error: ${error}`);
        }
      }
    );
  };

  return (
    <View>
      <Button title="Generate Code" onPress={generateRandomNumber} />
      <Button title="Send SMS" onPress={sendSMS} />
    </View>
  );
};

export default SmsScreen;
