import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { expo } from './app.json';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/view/Home';
import Signin from './src/view/signin';
import ForgetPass from './src/view/forgetPass';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home/>}
        </Stack.Screen>
        <Stack.Screen name="Signin" options={{headerShown: false}}>
          {props => <Signin />}
        </Stack.Screen>
        <Stack.Screen name="ForgetPass" options={{headerShown: false}}>
          {props => <ForgetPass />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
      
  );
}

AppRegistry.registerComponent(expo.name, () => App);