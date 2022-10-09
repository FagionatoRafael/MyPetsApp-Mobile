import { StatusBar } from 'expo-status-bar';
import { AppRegistry, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { expo } from './app.json';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from './src/view/Home';
import Signin from './src/view/signin';
import Confirmation from './src/view/Confirmation';
import ForgetPass from './src/view/forgetPass';
import NavegationOne from './src/view/NavegationHelper/firstHelp';
import NavegationSecond from './src/view/NavegationHelper/secondHelp';
import NavegationThird from './src/view/NavegationHelper/thirdHelp';
import AddPet from './src/view/Pets/add';

import asyncStorage from './util/asyncStorage';
import MyDrawer from './routes/drawerComponent';
import AddAgenda from './src/view/Agenda/addOrEdit';
import AddVaccine from './src/view/Vaccine/addOrEdit';
import EditUser from './src/view/EditUser/inde';
import { apiMain } from './services/connction';

type RootStackParamList = {
  Home: object;
  Signin: object;
  ForgetPass: object;
  NavegationOne: object;
  NavegationSecond: object
  NavegationThird: object
  TabsScreen: object;
  AddPets: object;
  AddAgenda: object;
  AddVaccine: object;
  drawer: object;
  Confirmation: object;
  EditUser: object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function App() {
  const [message, setMessage] = useState({});
  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState(false);
  const [token, setToken] = useState<any>('');
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
  //     setNotification(notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return  () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{orientation: 'portrait'}}>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home/>}
        </Stack.Screen>
        <Stack.Screen name="Signin" options={{headerShown: false}}>
          {props => <Signin />}
        </Stack.Screen>
        <Stack.Screen name="Confirmation" options={{headerShown: false}}>
          {props => <Confirmation />}
        </Stack.Screen>
        <Stack.Screen name="ForgetPass" options={{headerShown: false}}>
          {props => <ForgetPass />}
        </Stack.Screen>
        <Stack.Screen name="NavegationOne" options={{headerShown: false}}>
          {props => <NavegationOne />}
        </Stack.Screen>
        <Stack.Screen name="NavegationSecond" options={{headerShown: false}}>
          {props => <NavegationSecond />}
        </Stack.Screen>
        <Stack.Screen name="NavegationThird" options={{headerShown: false}}>
          {props => <NavegationThird />}
        </Stack.Screen>
        <Stack.Screen 
          name='drawer' 
          options={{ 
            headerShown: false,
          }}>
          {props => <MyDrawer/>}
        </Stack.Screen>
        <Stack.Screen  
          name="AddPets" 
          options={{
            headerStyle: {
              backgroundColor: '#5CDB95'
            },
            headerTitle: '',
            headerShadowVisible: false,
            statusBarHidden: true,
            headerBackButtonMenuEnabled: true,
            headerTintColor: '#05386B'
            // headerShown: false
          }}>
          {props => <AddPet />}
        </Stack.Screen>
        <Stack.Screen  
          name="AddAgenda" 
          options={{
            headerStyle: {
              backgroundColor: '#5CDB95'
            },
            headerTitle: '',
            headerShadowVisible: false,
            statusBarHidden: true,
            headerBackButtonMenuEnabled: true,
            headerTintColor: '#05386B'
            // headerShown: false
          }}>
          {props => <AddAgenda />}
        </Stack.Screen>
        <Stack.Screen  
          name="AddVaccine" 
          options={{
            headerStyle: {
              backgroundColor: '#5CDB95'
            },
            headerTitle: '',
            headerShadowVisible: false,
            statusBarHidden: true,
            headerBackButtonMenuEnabled: true,
            headerTintColor: '#05386B'
            // headerShown: false
          }}>
          {props => <AddVaccine />}
        </Stack.Screen>
        <Stack.Screen  
          name="EditUser" 
          options={{
            headerStyle: {
              backgroundColor: '#5CDB95'
            },
            headerTitle: '',
            headerShadowVisible: false,
            statusBarHidden: true,
            headerBackButtonMenuEnabled: true,
            headerTintColor: '#05386B'
            // headerShown: false
          }}>
          {props => <EditUser />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>      
  );
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    asyncStorage.set('tokenSend', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


AppRegistry.registerComponent(expo.name, () => App);
