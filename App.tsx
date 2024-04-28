/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM token:', token);
      }
    };

    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <></>;
};

export default App;
