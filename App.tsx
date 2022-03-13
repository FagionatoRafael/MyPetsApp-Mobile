import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { expo } from './app.json';
import Home from './src/view/Home';


export default function App() {
  return (
      <PaperProvider>
        <Home />
      </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);