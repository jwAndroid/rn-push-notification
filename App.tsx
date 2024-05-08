/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log(authStatus);
        // const token = await messaging().getToken();
        // console.log('FCM token:', token);
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

  const getToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM token:', token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const getRegisterDiToken = useCallback(async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('FCM token:', token);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Pressable
          style={{width: 100, height: 60, backgroundColor: '#000'}}
          onPress={getToken}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
