import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import React from 'react';
import { expo } from './app.json';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from './src/view/Home';
import Signin from './src/view/signin';
import ForgetPass from './src/view/forgetPass';
import NavegationOne from './src/view/NavegationHelper';
import AddPet from './src/view/Pets/add';

import MyDrawer from './routes/drawerComponent';

type RootStackParamList = {
  Home: object;
  Signin: object;
  ForgetPass: object;
  NavegationOne: object;
  TabsScreen: object;
  AddPets: undefined;
  drawer: object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen name="NavegationOne" options={{headerShown: false}}>
          {props => <NavegationOne />}
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
      </Stack.Navigator>
    </NavigationContainer>      
  );
}

AppRegistry.registerComponent(expo.name, () => App);