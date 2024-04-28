/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';

const App = () => {
  const checkToken = async () => {
    const token = await messaging().getToken();

    if (token) {
      console.log('token : ', token);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    checkToken();

    return unsubscribe;
  }, []);

  return <></>;
};

export default App;
